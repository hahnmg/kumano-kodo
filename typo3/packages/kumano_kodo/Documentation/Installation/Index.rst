..  _installation:

============
Installation
============

Require the theme, and the demo if you want content:

..  code-block:: bash

    composer require kumano-kodo/sitepackage
    composer require kumano-kodo/demo

Add the site set **Kumano Kodo** (`kumano-kodo/site`) to your site. It loads
fluid_styled_content, felogin, indexed_search, form and the sitemap of seo
before itself where they are installed; none of them is required.

Every page needs one of the theme's page layouts (Default, Landing, Journal,
Overview). Set one on the root page and as layout for the subpages; a page
without layout falls back to Default.

Demo or starter set
===================

Content comes from one of two packages; they exclude each other.

`kumano-kodo/demo`
    The full trail journal: four days, places, practical pages, photos, a search
    page, a contact form and a log-in with a published account (user `pilgrim`,
    password `Kumano-Kodo-2024`) that leads to a page only logged-in visitors
    see. Unknown addresses answer with its page "Page not found".

`kumano-kodo/starter`
    Five pages with placeholder texts to replace (home, about us, contact,
    imprint, privacy), the footer and the theme's contact form, in the reduced
    theme Mono.

..  code-block:: bash

    composer require kumano-kodo/starter

Both are TYPO3 distributions: without Composer, the installer offers them as
content to import during setup.
