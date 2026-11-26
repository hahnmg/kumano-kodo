..  _extensions:

====================
Supported extensions
====================

The theme renders these in its own markup when they are installed.

Core
====

Search (indexed_search)
    A magnifier in the header opens the search; results show like the Media
    List. The header finds the search page by its plugin, or by the setting
    Search page.

Login (felogin)
    The Login Form with its failed and logged-in states. Redirect after login
    and logout through the plugin's redirect settings; the logout goes straight
    to the logout target.

Forms (form)
    Every element type of the form framework is styled, from text fields to file
    uploads, fieldsets, columns and forms over several pages with numbered steps
    and a summary. Errors and descriptions show below each field; the
    confirmation shows as an Info Box. Validation messages come in the site's
    language. The theme ships a plain contact form (name, email, message,
    consent) to pick in the form plugin.

    The element "Date picker" works as a text field for a date in the form's
    format: its calendar needs jQuery UI, which the theme does not load. For a
    calendar, use the element "Date", which shows the browser's own.

Sitemap (seo)
    `/sitemap.xml`. Pages with "No index" stay out. Absolute URLs need a site
    base with a host.

Third-party
===========

Container (b13/container)
    Required. The containers Section and Columns are built on it.

Visual Editor (friendsoftypo3/visual-editor)
    Edits the texts of the elements in place: titles, eyebrows, rich text and
    the texts of cards, lists, figures and questions. In the form stay: image
    captions from the file, the fact list Pairs, group titles of Links in
    columns, the route map and the navigation.

News (georgringer/news)
    Comes with the package `kumano-kodo/theme-extras`, which stays outside the
    theme. Add its site set **Kumano Kodo · News**
    (`kumano-kodo/theme-extras-news`) to the site: the list shows the news as
    teaser cards with pages below, a news item shows its preview images and text
    with date, category and tags beside, and its other images as a gallery
    below. Put the detail plugin on a page with the layout **Landing**, so the
    news item brings its own page header and breadcrumb. Readable URLs need the
    route enhancers of the news manual's quick start, limited to the list and
    the detail page.
