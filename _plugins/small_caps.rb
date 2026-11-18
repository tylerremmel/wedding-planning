# frozen_string_literal: true

# Liquid filter: wraps runs of all-caps words in visible text (emphasis like "SILENCE" or
# "THAT IS THE COUPLE’S BABY") in <span class="sc">. Acronyms and other terms listed in
# _data/small_caps_skip.yml are left alone, and a run is only matched when it is two or more letters.
# Comments, <script>, <style>, <svg> and tags are skipped, so URLs and attributes are never touched,
# and words with digits or hyphens (I-95, ME-26) never match. Apply it once, to the whole page
# (_layouts/default.html); running it twice would nest spans.
module SmallCaps
  WORD = /[A-Z]{2,}(?:['’][A-Z]+)?/
  PATTERN = %r{
    (<!--.*?-->|<(script|style|svg)\b.*?</\2>|<[^>]*>)
    |
    (?<![\w.\-'’])(#{WORD}(?:[ ]+#{WORD})*)(?![\w.\-'’])
  }xm

  def small_caps(html)
    skip = Array(@context.registers[:site].data['small_caps_skip'])
    html.to_s.gsub(PATTERN) do
      next Regexp.last_match(1) if Regexp.last_match(1)

      run = Regexp.last_match(3)
      skip.include?(run) ? run : %(<span class="sc">#{run}</span>)
    end
  end
end

Liquid::Template.register_filter(SmallCaps)
