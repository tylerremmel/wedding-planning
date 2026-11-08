# Editing the wedding site

You only ever edit plain text files. Layout and styling are handled for you.

## Where things live

| To change…                                  | Edit…                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| Home page words, date line, tile text       | `_data/home.yml`                                                      |
| Our Story prose                             | `our-story.md`                                                        |
| Relationship milestones                     | `_data/milestones.yml`                                                |
| First impressions                           | `_data/first_impressions.yml`                                         |
| Our Story section names and the section nav | the `## Headings` in `our-story.md` (the nav builds itself from them) |
| Photo groups and captions                   | `_data/story_images.yml`                                              |
| Menu items                                  | `_data/navigation.yml`                                                |

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
- **On Our Story, a section runs from the divider above its `## Heading` to the next divider.** Add a section by adding a divider line (`{% raw %}{% include divider.html %}{% endraw %}` is a plain rule; add `ornament=true` for the ornament, normally only the first), then a `## New heading`; the nav picks it up automatically.
- **`TK` means "to come".** It shows as a yellow marker on the page. Search for `TK` to find unfinished content. Remove it when the real text is in.
- **Never put private information** (phone numbers, addresses, RSVP details) in these files: the repository is public.

## The header headline and topper image

The headline in the header ("Jenna and Tyler are getting married") is the same on every page. Change it once with `header_title` in `_config.yml` (one line of text per line shown on wide screens).

Every page has a topper image slot under the header. Until a page has a photo it shows a grey placeholder. To fill it, add this to the top of the page file (between the `---` lines), with the photo already run through the script below:

```yaml
hero:
  src: some-photo.jpg
  width: 1600
  height: 1067
  alt: TK
```

## Photos

1. Keep originals somewhere private (not in this repository).
2. Run `scripts/prep-image.sh 1600 path/to/photo.jpg`. It resizes, **removes all hidden metadata (including GPS location)**, saves a clean copy to `assets/img/`, and prints the lines to paste into a data file.
3. **`alt` text is required** and must be written by a person (what the photo shows, for people who can't see it). While it says `TK`, dev builds outline the image in yellow and the live site hides it from screen readers.

Edited a photo in Photoshop or Lightroom? Run the edited file through the script again: those apps add their own hidden metadata on export.
