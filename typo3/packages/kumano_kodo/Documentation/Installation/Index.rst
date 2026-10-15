..  _installation:

============
Installation
============

..  code-block:: bash

    composer require kumano-kodo/theme

Installing the extension adds no pages. Add its sets to your site, or create the
demo or the starter as a site of its own (below).

Every page needs one of the theme's page layouts (Default, Landing, Journal,
Overview). Set one on the root page and as layout for the subpages; a page
without layout falls back to Default.

Sets
====

Each feature is a set to switch on in the site's settings; each builds on the
theme.

`kumano-kodo/theme` · Kumano Kodo
    The theme. It loads fluid_styled_content, felogin, indexed_search, form and
    the sitemap of seo before itself where they are installed; none of them is
    required.

`kumano-kodo/news` · Kumano Kodo · News
    News of georgringer/news drawn with the theme's components: a teaser list
    with pages, and a detail page with its gallery below. Needs the extension
    news.

`kumano-kodo/journal` · Kumano Kodo · Journal
    The travel journal's own elements: a route map with linked stations and
    days, and numbered chapters.

`kumano-kodo/demo` · Kumano Kodo · Demo
    What the demo site uses: the theme, the journal elements and news.

Demo and starter
================

Both are created as a site of their own, with pages, files and site
configuration, from Sites › Kumano Kodo in the backend or on the command line:

..  code-block:: bash

    vendor/bin/typo3 kumano:demo:create
    vendor/bin/typo3 kumano:starter:create

The demo
    The full trail journal: four days, places, practical pages, photos, a search
    page, a contact form and a log-in with a published account (user `pilgrim`,
    password `Kumano-Kodo-2024`) that leads to a page only logged-in visitors
    see. Unknown addresses answer with its page "Page not found". It needs the
    extensions impexp, news and form.

The starter
    Five pages with placeholder texts to replace (home, about us, contact,
    imprint, privacy), the footer and the theme's contact form, in the reduced
    theme Mono. It needs impexp.

Without options a command picks a free site identifier and puts the site on `/`
when it is the first one, else on `/<identifier>/`; `--identifier` and `--base`
set both.
