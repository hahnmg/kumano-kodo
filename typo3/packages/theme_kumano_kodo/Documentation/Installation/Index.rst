..  _installation:

============
Installation
============

..  code-block:: bash

    composer require typo3/theme-kumano-kodo

Installing the extension adds no pages. Add its sets to your site, install the
demo package, or create the starter as a site of its own (below).

Every page needs one of the theme's page layouts (Default, Landing, Journal,
Overview). Set one on the root page and as layout for the subpages; a page
without layout falls back to Default.

Sets
====

Each feature is a set to switch on in the site's settings; each builds on the
theme. Sets for third-party extensions such as news come with the package
`kumano-kodo/theme-extras` (:ref:`extensions`).

`typo3/theme-kumano-kodo` · Kumano Kodo
    The theme. It loads fluid_styled_content, felogin, indexed_search, form and
    the sitemap of seo before itself where they are installed; none of them is
    required.

`typo3/theme-kumano-kodo-journal` · Kumano Kodo · Journal
    The travel journal's own elements: a route map with linked stations and
    days, and numbered chapters.

The demo
========

The full trail journal comes as a package of its own:

..  code-block:: bash

    composer require typo3/theme-kumano-kodo-demo

TYPO3 imports it once when the package is set up, as the installer does with any
distribution: the site `kumano-kodo` on `/` with four days, places, practical
pages, photos, a search page, a contact form and a log-in with a published
account (user `pilgrim`, password `Kumano-Kodo-2024`) that leads to a page only
logged-in visitors see. Unknown addresses answer with its page "Page not found".
The package brings the set Kumano Kodo · Demo (`typo3/theme-kumano-kodo-demo`)
and needs impexp and form.

The starter
===========

Five pages with placeholder texts to replace (home, about us, contact, imprint,
privacy), the footer and the theme's contact form, in the reduced theme Mono. It
is created as a site of its own from Sites › Kumano Kodo in the backend or on
the command line, and needs impexp:

..  code-block:: bash

    vendor/bin/typo3 kumano:starter:create

Without options the command picks a free site identifier and puts the site on
`/` when it is the first one, else on `/<identifier>/`; `--identifier` and
`--base` set both.
