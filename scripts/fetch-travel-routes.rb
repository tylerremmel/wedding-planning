# frozen_string_literal: true

# Draws the travel map's route lines once, ahead of time, so the site never calls a routing service.
#
#   ruby scripts/fetch-travel-routes.rb
#
# Reads `routes` in _data/travel_map.yml, asks the public OSRM demo server for a driving route from each route's
# `from` through its own `via` points and the shared `via` points to the destination, and writes the simplified
# lines to _data/travel_routes.json. A route with `joins` is cut off where it first meets that route, so the map
# never draws two lines on top of each other. OSRM's distance and time are printed for reference only.

require "json"
require "net/http"
require "uri"
require "yaml"

ROOT = File.expand_path("..", __dir__)
DATA = YAML.load_file(File.join(ROOT, "_data/travel_map.yml"))
OUT = File.join(ROOT, "_data/travel_routes.json")
OSRM = "https://router.project-osrm.org/route/v1/driving"
TOLERANCE = 0.0004 # degrees (about 40 m); larger = fewer points
JOIN_DISTANCE = 0.0003 # degrees (about 30 m): closer than this to the joined route counts as on it

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

# The first point of `coords` that lies on `other` (both [lng, lat]); everything after it is dropped.
def cut_at_join(coords, other)
  index = coords.index do |p|
    other.each_cons(2).any? { |a, b| distance_to_segment(p, a, b) <= JOIN_DISTANCE }
  end
  abort "The route never meets the route it joins." unless index
  coords[0..index]
end

destination = DATA["places"].find { |p| p["id"] == DATA["destination"] } or abort "No place matches `destination`."
full = {}
routes = {}

# Routes that others join go first, so they're there to cut against.
DATA["routes"].sort_by { |_, r| r["joins"] ? 1 : 0 }.each do |name, r|
  coords, meters, seconds = route(r["from"], *r["via"], *DATA["via"], destination)
  full[name] = coords
  coords = cut_at_join(coords, full.fetch(r["joins"])) if r["joins"]
  routes[name] = to_latlngs(coords)
  puts format("%-10s %4d points  %5.1f mi  %d h %02d min to the Inne (OSRM, for reference)",
              name, routes[name].length, meters / 1609.344, seconds / 3600, (seconds % 3600) / 60)
  sleep 1 # be polite to the demo server
end

File.write(OUT, "#{JSON.pretty_generate(routes)}\n")
puts "Wrote #{OUT.sub("#{ROOT}/", '')}. Run `npx prettier --write _data/travel_routes.json` to match the repo style."
