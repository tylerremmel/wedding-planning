# frozen_string_literal: true

# Liquid filter: wraps standalone "TK" (to come) in visible text with <mark class="tk">.
# HTML tags are skipped, so URLs and attributes are never touched, and \bTK\b ignores words like "ATKins".
module HighlightTk
  def highlight_tk(html)
    html.to_s.gsub(/(<[^>]*>)|\bTK\b/) { Regexp.last_match(1) || '<mark class="tk">TK</mark>' }
  end
end

Liquid::Template.register_filter(HighlightTk)
