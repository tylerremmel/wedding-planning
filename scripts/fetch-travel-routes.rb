# frozen_string_literal: true

# Draws the travel map's route lines once, ahead of time, so the site never calls a routing service.
#
#   ruby scripts/fetch-travel-routes.rb
#
# Reads the points in _data/travel_map.yml, asks the public OSRM demo server for a driving route from each
# route's first origin (or each through route's `from` and its own `via` points) through the shared `via` points
# to the destination, simplifies each line and writes _data/travel_routes.json. It also prints OSRM's distance and time for reference only:
# the popovers use the figures from the page copy, so the map never disagrees with the text.

require "json"
require "net/http"
require "uri"
require "yaml"

ROOT = File.expand_path("..", __dir__)
DATA = YAML.load_file(File.join(ROOT, "_data/travel_map.yml"))
OUT = File.join(ROOT, "_data/travel_routes.json")
OSRM = "https://router.project-osrm.org/route/v1/driving"
TOLERANCE = 0.0004 # degrees (about 40 m); larger = fewer points

def route(*points)
  path = points.map { |p| "#{p['lng']},#{p['lat']}" }.join(";")
  uri = URI("#{OSRM}/#{path}?overview=full&geometries=geojson")
  req = Net::HTTP::Get.new(uri, "User-Agent" => "travel-map-route-builder/1.0")
  res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) { |http| http.request(req) }
  body = JSON.parse(res.body)
  raise "OSRM: #{body['message'] || res.code}" unless body["code"] == "Ok"

  r = body["routes"][0]
  [r["geometry"]["coordinates"], r["distance"], r["duration"]]
end

# Ramer-Douglas-Peucker on [lng, lat] pairs.
def simplify(points, tolerance)
  return points if points.length < 3

  first = points.first
  last = points.last
  index = 0
  max = 0.0
  (1...(points.length - 1)).each do |i|
    d = distance_to_segment(points[i], first, last)
    if d > max
      max = d
      index = i
    end
  end
  return [first, last] if max <= tolerance

  simplify(points[0..index], tolerance)[0...-1] + simplify(points[index..], tolerance)
end

def distance_to_segment(p, a, b)
  dx = b[0] - a[0]
  dy = b[1] - a[1]
  len = (dx * dx) + (dy * dy)
  t = len.zero? ? 0 : (((p[0] - a[0]) * dx) + ((p[1] - a[1]) * dy)) / len
  t = t.clamp(0, 1)
  Math.hypot(p[0] - (a[0] + (t * dx)), p[1] - (a[1] + (t * dy)))
end

# Leaflet takes [lat, lng].
def to_latlngs(coords)
  simplify(coords, TOLERANCE).map { |lng, lat| [lat.round(5), lng.round(5)] }
end

destination = DATA["places"].find { |p| p["id"] == DATA["destination"] } or abort "No place matches `destination`."
routes = {}

starts = DATA["origins"].group_by { |o| o["route"] }.transform_values { |origins| [origins.first] }
(DATA["through_routes"] || []).each { |t| starts[t["route"]] = [t["from"], *t["via"]] }

starts.each do |name, points|
  coords, meters, seconds = route(*points, *DATA["via"], destination)
  routes[name] = to_latlngs(coords)
  puts format("%-10s %4d points  %5.1f mi  %d h %02d min (OSRM, for reference)",
              name, routes[name].length, meters / 1609.344, seconds / 3600, (seconds % 3600) / 60)
  sleep 1 # be polite to the demo server
end

File.write(OUT, "#{JSON.pretty_generate(routes)}\n")
puts "Wrote #{OUT.sub("#{ROOT}/", '')}. Run `npx prettier --write _data/travel_routes.json` to match the repo style."
