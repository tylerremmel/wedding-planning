# Editing the wedding site

You only ever edit plain text files. Layout and styling are handled for you.

## Where things live

| To change…                                              | Edit…                                                                 |
| ------------------------------------------------------- | --------------------------------------------------------------------- |
| Home page words, date line, tile text                   | `_data/home.yml`                                                      |
| Our Story prose                                         | `our-story.md`                                                        |
| Relationship milestones                                 | `_data/milestones.yml`                                                |
| Our Story section names and the top bar's section links | the `## Headings` in `our-story.md` (the nav builds itself from them) |
| Photo groups and captions                               | `_data/story_images.yml`                                              |
| Menu items (`disabled: true` hides one)                 | `_data/navigation.yml`                                                |
| Travel map labels, icons and points                     | `_data/travel_map.yml` (routes: see `docs/travel-routes-map.md`)      |

Colors, fonts and sizes live in `assets/css/tokens.css`. You shouldn't need to touch them.

## The `?edit` shortcut

Add `?edit` to any page address (for example `…/our-story/?edit`). A small pencil appears when you hover over an
editable block and opens that file in GitHub's editor. `?edit=off` turns it off. It only changes what you see;
GitHub decides who is allowed to save.

## Making a change (pull request flow)

1. Click a pencil (or open the file on GitHub) and choose the pencil/edit button.
2. Make your change, then **Commit changes** and choose **Create a new branch** (not the main branch).
3. Open the pull request. Tyler reviews and merges; merging to `main` publishes the site.

## Things not to break

- **YAML files** (`.yml`): keep the indentation exactly (two spaces per level), keep the `-` at the start of each list item, and keep text in straight double quotes. To put a double quote inside text, use the curly ones “ ”. A stray tab or missing quote breaks the whole page build.
- **Don't rename the left-hand keys** (`text:`, `date:`, `alt:`).
- **On Our Story, a section runs from the divider above its `## Heading` to the next divider.** Add a section by adding a divider line (`{% include divider.html %}` is a plain rule; add `ornament=true` for the ornament, normally only the first), then a `## New heading`; the nav picks it up automatically.
- **`TK` means "to come".** It shows as a yellow marker on the page. Search for `TK` to find unfinished content. Remove it when the real text is in.
- **ALL CAPS words get the small-caps look automatically.** To keep an acronym (like `RSVP`) normal, add it to `_data/small_caps_skip.yml`.
- **Never put private information** (phone numbers, addresses, RSVP details) in these files: the repository is public.

## Keeping a page out of search

Add `noindex: true` to a page's front matter (between the `---` lines) to tell search engines not to list it. `getting-there.md` uses it because it has the hotel's booking link. `robots.txt` also asks AI-training and bulk-scraper crawlers to skip the whole site. Both are polite requests, not locks: anyone with the page address (or the public repository) can still see the page.

Don't add a page to `robots.txt` to hide it. A crawler that can't open a page never sees its `noindex` tag, so the address can still show up in search results.

## The header headline and topper image

The headline in the header ("Jenna and Tyler are getting married") is the same on every page. Change it once with `header_title` in `_config.yml` (one line of text per line shown on wide screens).

Every page has a topper image slot under the header. Until a page has a photo it shows a grey placeholder. To fill it, add this to the top of the page file (between the `---` lines), with the photo already run through the script below:

```yaml
hero:
  src: some-photo.jpg
  width: 1600
  height: 1067
  alt: TK
  position: 50% 50% # which part of the photo stays in frame when it's cropped
  mobile_ratio: 4 / 5 # width / height of the photo on phones; change per page to suit the composition
  mobile_zoom: 1 # 1 = no zoom, 1.2 = 20% closer (on phones only)
```

The photos on the Home page tiles (`_data/home.yml`) take the same `position`, `mobile_ratio` and `mobile_zoom` under each tile's `image:`.

## Photos

1. Keep originals somewhere private (not in this repository).
2. Run `scripts/prep-image.sh 1600 path/to/photo.jpg`. It resizes, **removes all hidden metadata (including GPS location)**, saves a clean copy to `assets/img/`, and prints the lines to paste into a data file.
3. **`alt` text is required** and must be written by a person (what the photo shows, for people who can't see it). While it says `TK`, dev builds outline the image in yellow and the live site hides it from screen readers.

Edited a photo in Photoshop or Lightroom? Run the edited file through the script again: those apps add their own hidden metadata on export.
