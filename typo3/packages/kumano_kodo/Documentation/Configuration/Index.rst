..  _configuration:

=============
Configuration
=============

..  toctree::
    :maxdepth: 1

    SiteSettings

Error pages
===========

Point the site's error handling at a page of the site: 404 to a "Page not found"
page, 403 to the page with the login. The demo does both and keeps them when it
is imported.

Caching
=======

Like every TYPO3 site, pages go out as `private, no-store`. For client and proxy
caching set `config.sendCacheHeaders = 1` in the site's TypoScript; logged-in
visitors and pages with uncached plugins (search, login) still go out uncached.
