import { bindBackToTop } from '../scripts/back-to-top';
import { bindFileUploads } from '../scripts/file-upload';
import { bindMenuToggle } from '../scripts/menu-toggle';
import { bindNavFlyouts } from '../scripts/nav-flyout';
import { bindSchemeToggle, syncSchemeToggles } from '../scripts/scheme-toggle';
import { bindStickyHeader, syncStickyHeaders } from '../scripts/sticky-header';

bindSchemeToggle(document);
bindMenuToggle(document);
bindNavFlyouts(document);
bindStickyHeader(window);
bindBackToTop(window);
bindFileUploads(document);
syncSchemeToggles(document);
syncStickyHeaders(window);
