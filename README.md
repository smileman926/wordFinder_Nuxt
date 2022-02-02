
## Result Pages
Result pages are defined as pages that show word results in the main page container. These results are usually generated through the wordfinderapi and are grouped by word length. 

It is important to distinguish between two classes of result pages, since these pages have different behaviours:

### Dynamic Result Pages
These dynamic result pages are user generated, based on user input from the search form. The path for these pages is `/unscramble/*`

Features:
- Usually contain noindex tag
- No prismic or text content from local files
- Client side rendered and not pregenerated

### Indexed Result Pages
These pages are meant to be indexed by google, they don't contain a noindex tag. However, they contain a noindex tag in case the api returns 0 results for them.
Some of these result pages are SSG, depending on their presents in one of the dedicated XML sitemaps. Only the ones in the sitemap will be pregenerated. Some of these indexed result pages contain prismic content. Other result pages additionally contain content templates from local files (yml).

Following is an overview about the current classes of indexed result pages:

| slug                         | example                         | variable                              |
|------------------------------|---------------------------------|---------------------------------------|
| x_letter_words               | /4-letter-words                 | length                                |
| x_letter_words_with          | /5-letter-words-with-g          | must_contain length                   |
| x_letter_words_starting_with | /6-letter-words-starting-with-a | starts_with length                    |
| x_letter_words_ending_in     | /4-letter-words-ending-in-b     | ends_with length                      |
| starts_with                  | /words-start-with/c             | starts_with                           |
| ends_with                    | /words-end-in/e                 | ends_with                             |
| contains                     | /words-with/k                   | must_contain                          |
| with_char_twice              | /words-with-two-y               | must_contain_char1 must_contain_char2 |
| with_char_without_char       | /words-with/q/without/u         | must_contain must_not_contain         |
| with_char1_and_char2         | /words-with/a/and/x             | must_contain_char1 must_contain_char2 |
| custom_regex                 | /vowel-words/                   | regex                                 |

Details:
- 'x_letter_words' is the only indexed result page group that has prismic integration
- All other pages will have a text template that will contain variables (see variable column). Each of the template is group-specific
- Word result pages should have the option of showing prismic content. This is the exception, probably <10 pages will have prismic content, the prismic type is called 'indexed_result'

## List Pages
Different to result pages, the list pages don't contain any actual results from the api, they only contain lists of links that lead to indexed result pages. 
All of the list pages contain prismic documents with the corresponding UID.

Current List of List Pages:

| path               | associated result page | Generated links |
|--------------------|------------------------|-----------------|
| words-start-with   | starts_with            | A-Z             |
| words-end-in       | ends_with              | A-Z             |
| words-by-length    | x_letter_words         | 2-10            |
| words-with-letters | contains               | A-Z             |
