..  _components:

=================================
Components for extension authors
=================================

The theme draws everything it renders with Fluid components. Templates of other extensions, a news or blog
extension for instance, use the same components and look like the rest of the site without CSS of their own.

..  toctree::
    :hidden:

    Reference

Use a component
===============

Declare the namespace and call a component by its name:

..  code-block:: html

    <html
        xmlns:f="http://typo3.org/ns/TYPO3/CMS/Fluid/ViewHelpers"
        xmlns:kk="http://typo3.org/ns/KumanoKodo/Sitepackage/Components"
        data-namespace-typo3-fluid="true"
    >
    <kk:grid columns="3">
        <f:for each="{items}" as="item">
            <kk:teaserCard
                title="{item.title}"
                href="{f:uri.typolink(parameter: item.link)}"
                image="{item.image -> f:first()}"
                meta="{item.date -> f:format.date(format: 'd.m.Y')}"
            />
        </f:for>
    </kk:grid>
    </html>

Every component and its arguments are listed in the :ref:`component-reference`.

Rules
=====

Arguments are checked
    A component declares its arguments. A missing required one, an unknown one or a value of the wrong type stops
    rendering with a message that names it.

Links are URLs
    `href` takes the finished URL. Build it in your template, with `f:uri.page`, `f:uri.action` or
    `f:uri.typolink`.

Images are files
    `image` takes a file or file reference. The component renders it responsive, in three widths.

Content goes in slots
    Text with markup, such as the text of an Info Box, goes between the tags. Several parts go in named fragments,
    for example `<f:fragment name="links">` in an Info Box. Lists are a container with one component per entry, such
    as `kk:timeline` with `kk:timelineItem`.

HTML in a variable is escaped
    Fluid escapes a variable with HTML that is passed into a slot. Pass rich text through `f:format.html`, or trusted
    HTML through `f:format.raw`.

Styles come along
    A component loads its own stylesheet and script. Nothing has to be included by hand.

Override a component
====================

Another extension can replace single components with its own templates. Add its folder to the theme's collection
in its own :file:`Configuration/Fluid/ComponentCollections.php`, with a higher key:

..  code-block:: php

    return [
        'KumanoKodo\\Sitepackage\\Components' => [
            'templatePaths' => [
                20 => 'EXT:my_site/Resources/Private/Components',
            ],
        ],
    ];

A file there, such as :file:`TeaserCard/TeaserCard.fluid.html`, then wins over the theme's.

Stability
=========

The names and arguments in the reference are the theme's public interface. Within a major version they only grow:
new components and new optional arguments. The page frame (header, footer, top bar, menus) is not part of it.
