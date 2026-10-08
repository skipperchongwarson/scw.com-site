'use strict';
// var mainDocument = $(document);

// init foundation
// $(document).foundation();

// Init all plugin when document is ready 
$(document).on('ready', function () {
	// 0. Init console to avoid error
	var method;
	var noop = function () { };
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	var contextWindow = $(window);
	var $root = $('html, body');
	while (length--) {
		method = methods[length];
		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}

	// 1. Background image as data attribut 
	var list = $('.bg-img');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-image-src');
		list[i].style.backgroundImage = "url('" + src + "')";
		list[i].style.backgroundRepeat = "no-repeat";
		list[i].style.backgroundPosition = "center";
		list[i].style.backgroundSize = "cover";
	}
	// Image block to Background image 
	var listImgBlock = $('.img-block');
	for (var i = 0; i < listImgBlock.length; i++) {
		var src = listImgBlock[i].getAttribute('src');
		var divBlock = document.createElement("div");
		divBlock.setAttribute("class", "img");
		divBlock.style.backgroundImage = "url('" + src + "')";
		divBlock.style.backgroundRepeat = "no-repeat";
		divBlock.style.backgroundPosition = "center";
		divBlock.style.backgroundSize = "cover";
		$(listImgBlock[i]).after(divBlock);
		listImgBlock[i].style.display = "none";
	}
	// Background color as data attribut
	var listColor = $('.bg-color');
	for (var i = 0; i < listColor.length; i++) {
		var src = listColor[i].getAttribute('data-bgcolor');
		listColor[i].style.backgroundColor = src;
	}

	// 2. Init Coutdown clock
	try {
		// check if clock is initialised
		$('.clock-countdown').downCount({
			date: $('.site-config').attr('data-date'),
			offset: +10
		});
	}
	catch (error) {
		// Clock error : clock is unavailable
		console.log("clock disabled/unavailable");
	}

	// 3. Show/hide menu when icon is clicked
	var menuItems = $('.all-menu-wrapper .nav-link');
	var menuToggler = $('.navbar-toggler');
	var menuBlock = $('.all-menu-wrapper');
	var reactToMenu = $ ('.page-main, .navbar-sidebar, .page-cover, .responsive-dot-rail')
	var menuLinks = $(".navbar-mainmenu a, .navbar-sidebar a");
	// Menu icon clicked
	menuToggler.on('click', function () {
		var isOpen = menuToggler.toggleClass('menu-visible').hasClass('menu-visible');

		menuBlock.toggleClass('menu-visible');
		menuItems.toggleClass('menu-visible');
		reactToMenu.toggleClass('menu-visible');

		menuToggler.attr('aria-expanded', isOpen ? 'true' : 'false');
		menuToggler.attr('aria-label', isOpen ? 'Close menu' : 'Open menu');

		return false;
	});

	// Hide menu after a menu item clicked
	menuLinks.on('click', function () {
		menuToggler.removeClass('menu-visible');
		menuBlock.removeClass('menu-visible');
		menuItems.removeClass('menu-visible');
		reactToMenu.removeClass('menu-visible');

		menuToggler.attr('aria-expanded', 'false');
		menuToggler.attr('aria-label', 'Open menu');

		return true;
	});

	// 4 Carousel Slider
	
	// 4.a carousel-alpha demo
	$('.carousel-slick-alpha-demo').slick({
		dots: true
	});

	// carousel-fullscreen : fullscreen projects slider
	new Swiper('.carousel-swiper-fullscreen-demo .swiper-container', {
		pagination: '.carousel-swiper-fullscreen-demo .items-pagination',
		paginationClickable: '.carousel-fullscreen-demo .items-pagination',
		nextButton: '.carousel-swiper-fullscreen-demo .items-button-next',
		prevButton: '.carousel-swiper-fullscreen-demo .items-button-prev',
		loop: true,
		grabCursor: true,
		centeredSlides: false,
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 2,
		spaceBetween: 16,
		effect: 'slide',
		breakpoints: {
			440: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});
	// carousel-beta :projects list slider
	var relatedProjectsSwiper = new Swiper('.carousel-swiper-beta-demo .swiper-container', {
		pagination: '.carousel-swiper-beta-demo .items-pagination',
		paginationClickable: '.carousel-beta-demo .items-pagination',
		grabCursor: true,
		centeredSlides: false,
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 2,
		spaceBetween: 0,
		breakpoints: {
			1024: {
				slidesPerView: 2,
			},
			800: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			640: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			440: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});
	// nextButton/prevButton removed from config above: Swiper's own click
	// binding raced with the check below (isEnd/isBeginning update
	// synchronously inside slideTo, before the CSS transition finishes),
	// so the boundary check has to be the only handler on these buttons.
	$('.carousel-swiper-beta-demo .items-button-next').on('click', function () {
		if (relatedProjectsSwiper.isEnd) {
			relatedProjectsSwiper.slideTo(0);
		} else {
			relatedProjectsSwiper.slideNext();
		}
	});
	$('.carousel-swiper-beta-demo .items-button-prev').on('click', function () {
		if (relatedProjectsSwiper.isBeginning) {
			relatedProjectsSwiper.slideTo(relatedProjectsSwiper.slides.length - 1);
		} else {
			relatedProjectsSwiper.slidePrev();
		}
	});
	
	// Case-study image galleries
	$('.case-study-gallery').each(function () {
	  var gallery = $(this);
	  var galleryId = gallery.attr('id');

	  if (!galleryId) {
	    return;
	  }

	  var selector = '#' + galleryId;

	  var swiperOptions = {
	    pagination: selector + ' .items-pagination',
	    paginationClickable: true,

	    nextButton: selector + ' .items-button-next',
	    prevButton: selector + ' .items-button-prev',

	    loop: true,
	    grabCursor: true,
	    centeredSlides: false,
	    autoplay: false,
	    slidesPerView: 1,
	    spaceBetween: 0,
	    effect: 'slide'
	  };

	  // Shep "solution" admin gallery only: slides 3-4 render at a
	  // different height than slides 1-2, so once fullPage has measured
	  // this section's scrollOverflow height, switching to one of those
	  // slides can leave the internal scrollbar too short to reach the
	  // content below the gallery. Ask fullPage to remeasure shortly
	  // after each slide-change transition finishes. Debounced so a
	  // quick run of next/prev clicks only triggers one rebuild. Uses
	  // onSlideChangeEnd because that's the callback this bundled
	  // Swiper 3.4.2 build actually supports (verified in js/vendor/all.js).
	  if (galleryId === 'shep-admin-gallery') {
	    var shepGalleryRebuildTimer;
	    swiperOptions.onSlideChangeEnd = function () {
	      clearTimeout(shepGalleryRebuildTimer);
	      shepGalleryRebuildTimer = setTimeout(function () {
	        if ($.fn.fullpage && typeof $.fn.fullpage.reBuild === 'function') {
	          $.fn.fullpage.reBuild();
	        }
	      }, 200);
	    };
	  }

	  new Swiper(selector + ' .swiper-container', swiperOptions);
	});

	// Case-study full-screen image viewer
	(function initCaseStudyLightbox() {
		var body = document.body;
		var lightboxSwiper = null;
		var lastTrigger = null;
		var phonePortraitQuery = window.matchMedia(
			'(max-width: 576px) and (orientation: portrait)'
		);
		var triggerSelector =
			'#mainpage .section img, ' +
			'#mainpage .section [role="img"][data-image-src]';

		if (
			!body ||
			!body.classList.contains('case-study-page') ||
			typeof Swiper === 'undefined'
		) {
			return;
		}

		var lightbox = document.createElement('div');
		lightbox.className = 'case-study-lightbox';
		lightbox.setAttribute('role', 'dialog');
		lightbox.setAttribute('aria-modal', 'true');
		lightbox.setAttribute('aria-label', 'Full-screen case-study image');
		lightbox.setAttribute('aria-hidden', 'true');
		lightbox.innerHTML =
			'<button type="button" class="case-study-lightbox__close" aria-label="Close full-screen image">' +
				'<span aria-hidden="true">&times;</span>' +
			'</button>' +
			'<div class="case-study-lightbox__swiper swiper-container">' +
				'<div class="case-study-lightbox__slides swiper-wrapper"></div>' +
			'</div>' +
			'<button type="button" class="case-study-lightbox__button case-study-lightbox__button--prev" aria-label="Previous image">' +
				'<span class="icon arrow-left" aria-hidden="true"></span>' +
			'</button>' +
			'<div class="case-study-lightbox__pagination" aria-label="Image pagination"></div>' +
			'<button type="button" class="case-study-lightbox__button case-study-lightbox__button--next" aria-label="Next image">' +
				'<span class="icon arrow-right" aria-hidden="true"></span>' +
			'</button>';
		body.appendChild(lightbox);

		var slideWrapper = lightbox.querySelector(
			'.case-study-lightbox__slides'
		);
		var closeButton = lightbox.querySelector(
			'.case-study-lightbox__close'
		);
		var previousButton = lightbox.querySelector(
			'.case-study-lightbox__button--prev'
		);
		var nextButton = lightbox.querySelector(
			'.case-study-lightbox__button--next'
		);
		var pagination = lightbox.querySelector(
			'.case-study-lightbox__pagination'
		);

		function lightboxIsAllowed() {
			return !phonePortraitQuery.matches;
		}

		function normaliseText(value) {
			return value ? value.replace(/\s+/g, ' ').trim() : '';
		}

		function originalImageLabel(element) {
			var storedLabel = $(element).data('caseStudyLightboxLabel');

			if (storedLabel !== undefined) {
				return storedLabel;
			}

			return normaliseText(
				element.getAttribute('alt') ||
				element.getAttribute('aria-label') ||
				''
			);
		}

		function imageSource(element) {
			if (element.tagName.toLowerCase() === 'img') {
				return element.currentSrc || element.getAttribute('src') || '';
			}

			return element.getAttribute('data-image-src') || '';
		}

		function imageCaption(element) {
			var container = element.closest(
				'.swiper-slide, .img-frame-normal, figure, .photo-print'
			);
			var caption = container
				? container.querySelector(
					'.case-study-gallery__caption, figcaption, .legend p, .legend'
				)
				: null;

			return caption ? normaliseText(caption.textContent) : '';
		}

		function imageData(element) {
			return {
				src: imageSource(element),
				alt: originalImageLabel(element),
				caption: imageCaption(element)
			};
		}

		function eligibleImagesInGallery(gallery) {
			return Array.prototype.filter.call(
				gallery.querySelectorAll(
					'.swiper-slide img, ' +
					'.swiper-slide [role="img"][data-image-src]'
				),
				function (element) {
					return (
					imageSource(element) &&
					!element.closest('.related-projects') &&
					!element.closest('.swiper-slide-duplicate')
				);
				}
			);
		}

		// Swiper's loop mode clones the first and last slides. A clone can be
		// the visible slide, so a click on it opens the original slide it
		// copies (matched by Swiper's data-swiper-slide-index).
		function originalImageFor(trigger, gallery) {
			var duplicate = trigger.closest('.swiper-slide-duplicate');

			if (!duplicate) {
				return trigger;
			}

			var original = gallery.querySelector(
				'.swiper-slide:not(.swiper-slide-duplicate)' +
				'[data-swiper-slide-index="' +
				duplicate.getAttribute('data-swiper-slide-index') +
				'"]'
			);
			var originalImage = original
				? original.querySelector('img, [role="img"][data-image-src]')
				: null;

			return originalImage || trigger;
		}

		function lightboxItemsFor(trigger) {
			var gallery = trigger.closest('.case-study-gallery');
			var elements = gallery
				? eligibleImagesInGallery(gallery)
				: [trigger];
			var items = elements.map(imageData).filter(function (item) {
				return item.src;
			});
			var triggerIndex = elements.indexOf(
				gallery ? originalImageFor(trigger, gallery) : trigger
			);

			return {
				items: items,
				index: triggerIndex < 0 ? 0 : triggerIndex
			};
		}

		function buildSlides(items) {
			slideWrapper.innerHTML = '';

			items.forEach(function (item) {
				var slide = document.createElement('div');
				var figure = document.createElement('figure');
				var imageWrap = document.createElement('div');
				var image = document.createElement('img');

				slide.className = 'case-study-lightbox__slide swiper-slide';
				figure.className = 'case-study-lightbox__figure';
			  imageWrap.className =
			    'case-study-lightbox__image-wrap swiper-zoom-container';
				image.className = 'case-study-lightbox__image';
				image.src = item.src;
				image.alt = item.alt;
				image.draggable = false;

				imageWrap.appendChild(image);
				figure.appendChild(imageWrap);

				if (item.caption) {
					var caption = document.createElement('figcaption');
					caption.className = 'case-study-lightbox__caption';
					caption.textContent = item.caption;
					figure.appendChild(caption);
				}

				slide.appendChild(figure);
				slideWrapper.appendChild(slide);
			});
		}

		function setFullPageInput(enabled) {
			if (!$.fn.fullpage) {
				return;
			}

			if (typeof $.fn.fullpage.setAllowScrolling === 'function') {
				$.fn.fullpage.setAllowScrolling(enabled);
			}

			if (typeof $.fn.fullpage.setKeyboardScrolling === 'function') {
				$.fn.fullpage.setKeyboardScrolling(enabled);
			}
		}

		function destroyLightboxSwiper() {
			if (
				lightboxSwiper &&
				typeof lightboxSwiper.destroy === 'function'
			) {
				lightboxSwiper.destroy(true, true);
			}

			lightboxSwiper = null;
		}

		function openLightbox(trigger) {
			var galleryData;
			var isSingle;

			if (!lightboxIsAllowed()) {
				return;
			}

			galleryData = lightboxItemsFor(trigger);

			if (!galleryData.items.length) {
				return;
			}

			lastTrigger = trigger;
			destroyLightboxSwiper();
			buildSlides(galleryData.items);
			isSingle = galleryData.items.length === 1;

			lightbox.classList.toggle(
				'case-study-lightbox--single',
				isSingle
			);
			previousButton.disabled = isSingle;
			nextButton.disabled = isSingle;
			pagination.setAttribute('aria-hidden', isSingle ? 'true' : 'false');
			lightbox.classList.add('is-open');
			lightbox.setAttribute('aria-hidden', 'false');
			body.classList.add('case-study-lightbox-open');
			setFullPageInput(false);

			lightboxSwiper = new Swiper(
			  '.case-study-lightbox__swiper',
			  {
			    pagination: '.case-study-lightbox__pagination',
			    paginationClickable: true,
			    nextButton: '.case-study-lightbox__button--next',
			    prevButton: '.case-study-lightbox__button--prev',
			    initialSlide: galleryData.index,

			    zoom: true,
			    zoomMin: 1,
			    zoomMax: 4,

			    loop: false,
			    grabCursor: true,
			    centeredSlides: false,
			    autoplay: false,
			    slidesPerView: 1,
			    spaceBetween: 0,
			    effect: 'slide'
			  }
			);

			closeButton.focus();
		}

		function closeLightbox() {
			if (!lightbox.classList.contains('is-open')) {
				return;
			}

			lightbox.classList.remove('is-open');
			lightbox.setAttribute('aria-hidden', 'true');
			body.classList.remove('case-study-lightbox-open');
			setFullPageInput(true);
			destroyLightboxSwiper();

			if (lastTrigger && document.documentElement.contains(lastTrigger)) {
				lastTrigger.focus();
			}
		}

		function isExcludedImage(element) {
			return (
				element.closest('.related-projects') ||
				element.closest('.case-study-lightbox') ||
				!imageSource(element)
			);
		}

		function setTriggerEnabled(element, enabled) {
			var label;

			if ($(element).data('caseStudyLightboxOriginalRole') === undefined) {
				$(element).data(
					'caseStudyLightboxOriginalRole',
					element.getAttribute('role') || ''
				);
				$(element).data(
					'caseStudyLightboxOriginalAriaLabel',
					element.getAttribute('aria-label') || ''
				);
				$(element).data(
					'caseStudyLightboxLabel',
					normaliseText(
						element.getAttribute('alt') ||
						element.getAttribute('aria-label') ||
						''
					)
				);
			}

			if (enabled) {
				label = originalImageLabel(element);
				element.classList.add('case-study-lightbox-trigger');
				// Loop clones stay clickable but out of the tab order, so
				// keyboard users meet each gallery image once.
				element.setAttribute(
					'tabindex',
					element.closest('.swiper-slide-duplicate') ? '-1' : '0'
				);
				element.setAttribute('role', 'button');
				element.setAttribute('aria-haspopup', 'dialog');
				element.setAttribute(
					'aria-label',
					label
						? 'Open full-screen image: ' + label
						: 'Open full-screen image'
				);
				return;
			}

			element.classList.remove('case-study-lightbox-trigger');
			element.removeAttribute('tabindex');
			element.removeAttribute('aria-haspopup');
			var originalRole = $(element).data(
				'caseStudyLightboxOriginalRole'
			);
			var originalAriaLabel = $(element).data(
				'caseStudyLightboxOriginalAriaLabel'
			);

			if (originalRole) {
				element.setAttribute('role', originalRole);
			} else {
				element.removeAttribute('role');
			}

			if (originalAriaLabel) {
				element.setAttribute('aria-label', originalAriaLabel);
			} else {
				element.removeAttribute('aria-label');
			}
		}

		function refreshTriggers() {
			var allowed = lightboxIsAllowed();
			var triggers = document.querySelectorAll(triggerSelector);

			Array.prototype.forEach.call(triggers, function (element) {
				setTriggerEnabled(element, allowed && !isExcludedImage(element));
			});

			if (!allowed) {
				closeLightbox();
			}
		}

		$(document).on(
			'click.caseStudyLightbox',
			'.case-study-lightbox-trigger',
			function (event) {
				event.preventDefault();
				event.stopPropagation();
				openLightbox(this);
			}
		);

		$(document).on(
			'keydown.caseStudyLightbox',
			'.case-study-lightbox-trigger',
			function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					event.stopPropagation();
					openLightbox(this);
				}
			}
		);

		// Section-cover images sit behind the content layer. Catch taps that
		// land inside their visible bounds without blocking text or controls.
		$(document).on(
			'click.caseStudyLightbox',
			'#mainpage .section',
			function (event) {
				var backgroundImages;
				var clickedInteractiveContent;

				if (
					!lightboxIsAllowed() ||
					event.isDefaultPrevented() ||
					$(event.target).closest('.case-study-lightbox-trigger').length
				) {
					return;
				}

				clickedInteractiveContent = $(event.target).closest(
					'a, button, input, select, textarea, .title-desc, ' +
					'.editorial-blockquote, .related-projects'
				).length;

				if (clickedInteractiveContent) {
					return;
				}

				backgroundImages = this.querySelectorAll(
					'[role="button"][data-image-src].case-study-lightbox-trigger'
				);

				Array.prototype.some.call(backgroundImages, function (image) {
					var rect = image.getBoundingClientRect();
					var isInside =
						event.clientX >= rect.left &&
						event.clientX <= rect.right &&
						event.clientY >= rect.top &&
						event.clientY <= rect.bottom;

					if (isInside) {
						event.preventDefault();
						event.stopPropagation();
						openLightbox(image);
					}

					return isInside;
				});
			}
		);

		closeButton.addEventListener('click', function () {
			closeLightbox();
		});

		document.addEventListener('keydown', function (event) {
			if (!lightbox.classList.contains('is-open')) {
				return;
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				closeLightbox();
				return;
			}

			if (event.key === 'ArrowLeft' && lightboxSwiper) {
				event.preventDefault();
				lightboxSwiper.slidePrev();
				return;
			}

			if (event.key === 'ArrowRight' && lightboxSwiper) {
				event.preventDefault();
				lightboxSwiper.slideNext();
				return;
			}

			if (event.key === 'Tab') {
				var focusable = lightbox.querySelectorAll(
					'button:not([disabled]), ' +
					'.swiper-pagination-bullet[tabindex="0"]'
				);

				if (!focusable.length) {
					return;
				}

				var first = focusable[0];
				var last = focusable[focusable.length - 1];

				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		});

		window.addEventListener('resize', refreshTriggers);
		window.addEventListener('orientationchange', refreshTriggers);
		refreshTriggers();
	})();
		
	// 4.1 Slideshow slider
	var imageList = $('.slide-show .img');
	var imageSlides = [];
	for (var i = 0; i < imageList.length; i++) {
		var src = imageList[i].getAttribute('data-src');
		imageSlides.push({ src: src });
	}
	$('.slide-show').vegas({
		delay: 5000,
		shuffle: true,
		slides: imageSlides,
		animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
	});
	
	// 5. Init video background
	var videoBg = $('.video-container video, .video-container object');

	// 6. Prepare content for animation
	$('.section .content .anim.anim-wrapped').wrap("<span class='anim-wrapper'></span>");

	// 7. Init fullPage.js plugin
	var pageSectionDivs = $('.page-fullpage .section');
	var headerLogo = $('.header-top .logo');
	var bodySelector = $('body');
	var sectionSelector = $('.section');
	var headerContainer = $('.hh-header');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var siteFooter = $('.page-footer');
	var siteHeader = $('.navbar-top-alpha');
	var siteHeaderFooter = $('.navbar-top-alpha,.page-footer,.section-footer');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];
	var nextSectionDOM;
	var nextSection;
	var fpnavItem;
	var mainPage = $('#mainpage');
	var galleryPage = $('#gallerypage');
	var sendEmailForm = $('.send_email_form');
	var sendMessageForm = $('.send_message_form');
	var scrollOverflow = true;
	var css3 = true;
	// disable scroll overflow on small device
	if (contextWindow.width() < 601) {
		scrollOverflow = false;
		css3 = false;
	}
	if (contextWindow.height() < 480) {
		scrollOverflow = false;
		css3 = false;
	}
	// Get sections name
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function (pageSection, cb) {
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function (err) {
		// Init plugin
		if (mainPage.width()) {
			var isCaseStudyPage = $('body').hasClass('case-study-page');
			var explicitSectionNavigation = false;
			var sectionEntryWasExplicit = false;
			// Element whose keyboard focus caused the current section change.
			var focusEntryTarget = null;

			if (isCaseStudyPage) {
				document.addEventListener(
					'click',
					function (event) {
						var target = event.target;

						if (
							!target ||
							typeof target.closest !== 'function'
						) {
							return;
						}

						var control = target.closest(
							'#fp-nav a, ' +
							'.responsive-dot-rail a, ' +
							'#qmenu a, ' +
							'.navbar-mainmenu a[href*="#"]'
						);

						if (control) {
							explicitSectionNavigation = true;
						}
					},
					true
				);

				document.addEventListener(
					'keydown',
					function (event) {
						var explicitKeys = [
							'ArrowUp',
							'ArrowDown',
							'PageUp',
							'PageDown',
							'Home',
							'End',
							' '
						];

						if (explicitKeys.indexOf(event.key) !== -1) {
							explicitSectionNavigation = true;
						}
					},
					true
				);
			}

			// Keep fullPage in step with keyboard focus. fullPage moves
			// sections with a transform, so when focus lands outside the
			// visible area the browser scrolls body, the section's overflow
			// wrapper or a gallery natively to show it. fullPage, iScroll and
			// Swiper never learn about that offset, and the next wheel or
			// arrow move lands on a blank screen. Undo the native scroll and
			// let those plugins do the moving instead.
			function clearNativeFocusScroll(element) {
				for (
					var node = element.parentNode;
					node && node.nodeType === 1;
					node = node.parentNode
				) {
					if (node.scrollTop) {
						node.scrollTop = 0;
					}

					if (node.scrollLeft) {
						node.scrollLeft = 0;
					}
				}
			}

			function focusIsFromKeyboard(element) {
				// An iframe never matches :focus-visible in this document.
				if (element.tagName === 'IFRAME') {
					return true;
				}

				try {
					return element.matches(':focus-visible');
				} catch (error) {
					return true;
				}
			}

			function revealFocusedElement(element) {
				clearNativeFocusScroll(element);

				if (!focusIsFromKeyboard(element)) {
					return;
				}

				var slide = element.closest('.swiper-slide');
				var swiperContainer = slide
					? slide.closest('.swiper-container')
					: null;
				var swiper = swiperContainer ? swiperContainer.swiper : null;

				if (swiper && !slide.classList.contains('swiper-slide-active')) {
					swiper.slideTo($(slide).index(), 0);
				}

				var $scrollable = $(element).closest('.fp-scrollable');
				var scroller = $scrollable.data('iscrollInstance');

				if (!scroller || typeof scroller.scrollToElement !== 'function') {
					return;
				}

				var area = $scrollable[0].getBoundingClientRect();
				var rect = element.getBoundingClientRect();

				if (rect.top >= area.top && rect.bottom <= area.bottom) {
					return;
				}

				// Centre elements that fit; start taller ones below the
				// fixed header instead of centring their top out of view.
				var fits = element.offsetHeight < area.height - 192;

				scroller.scrollToElement(element, 0, 0, fits ? true : -96);
			}

			// config fullpage.js
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				recordHistory: false,
				verticalCentered: false,
				css3: css3,
				navigation: true,
				responsiveWidth: 992,
				responsiveHeight: 500,
				scrollOverflow: scrollOverflow,
				bigSectionsDestination: 'top',
				scrollOverflowOptions: {
				    // scrollbars: false,
				    click: false,
				    submit: true,
				    mouseWheel: true,
				},
				afterRender: function () {

					// Honor a section hash when the page is loaded directly,
					// e.g. /#select-projects, /#about, /#contact
					var initialAnchor = window.location.hash.replace('#', '');

					if (
						initialAnchor &&
						pageAnchors.indexOf(initialAnchor) !== -1
					) {
						window.setTimeout(function () {
							if (typeof $.fn.fullpage.silentMoveTo === 'function') {
								$.fn.fullpage.silentMoveTo(initialAnchor);
							} else {
								$.fn.fullpage.moveTo(initialAnchor);
							}
						}, 0);
					}

					// init parallax 
					var parallaxCover = document.getElementById('parallax-cover')
					if (parallaxCover) {
						if (contextWindow.width() > 1024) {
							var parallaxInstance = new Parallax(parallaxCover);
						}
					}
					// init sliders
					
					// carousel-alpha : team about us
					new Swiper('.carousel-swiper-alpha-demo .swiper-container', {
						pagination: '.carousel-swiper-alpha-demo .items-pagination',
						paginationClickable: '.carousel-alpha-demo .items-pagination',
						nextButton: '.carousel-swiper-alpha-demo .items-button-next',
						prevButton: '.carousel-swiper-alpha-demo .items-button-prev',
						loop: true,
						grabCursor: true,
						centeredSlides: false,
						autoplay: 5000,
						autoplayDisableOnInteraction: false,
						slidesPerView: 2,
						spaceBetween: 16,
						effect: 'slide',
						breakpoints: {
							440: {
								slidesPerView: 1,
								spaceBetween: 0
							}
						}
					});
					
					// Fix video background
					videoBg.maximage('maxcover');

					// Fix for internet explorer : adjust content height
					// Detect IE 6-11
					var isIE = /*@cc_on!@*/false || !!document.documentMode;
					if (isIE) {
						var contentColumns = $('.section .content .c-columns');
						contentColumns.height(contextWindow.height())
						for (var i = 0; i < contentColumns.length; i++) {
							if (contentColumns[i].height <= contextWindow.height()) {
								contentColumns[i].style.height = "100vh";
							}
						}
					}

					// init contact form
					// Default server url
					var newsletterServerUrl = './ajaxserver/serverfile.php';
					var messageServerUrl = './ajaxserver/serverfile.php';

					// Use form define action attribute
					if (sendEmailForm.attr('action') && (sendEmailForm.attr('action')) != '') {
						newsletterServerUrl = sendEmailForm.attr('action');
					}
					if (sendMessageForm.attr('action') && (sendMessageForm.attr('action') != '')) {
						messageServerUrl = sendMessageForm.attr('action');
					}

					sendEmailForm.initForm({
						serverUrl: newsletterServerUrl,
					});
					sendMessageForm.initForm({
						serverUrl: messageServerUrl,
					});

				},
				afterResize: function () {
					$.fn.fullpage.reBuild();
				},

				onLeave: function (index, nextIndex, direction) {
					if (isCaseStudyPage) {
						sectionEntryWasExplicit = explicitSectionNavigation;
						explicitSectionNavigation = false;
					}

					// Start the background crossfade while the sections are moving.
					var pageCover = $('.page-cover');

					if (nextIndex > 1) {
						pageCover.addClass('scrolled');
					} else {
						pageCover.removeClass('scrolled');
					}

					// Existing behavior when a full page is left.
					arrowElem.addClass('gone');
					pageElem.addClass('transition');
					slideElem.removeClass('transition');
					pageElem.removeClass('transition');
				},

				afterLoad: function (anchorLink, index) {
					// Behavior after a full page is loaded.
					if (index > 1) {
						if (!siteHeader.hasClass('fp-scrolled')) {
							siteHeader.addClass('fp-scrolled');
						}

						if (!siteFooter.hasClass('fp-scrolled')) {
							siteFooter.addClass('fp-scrolled');
						}
					} else {
						siteHeader.removeClass('fp-scrolled');
						siteFooter.removeClass('fp-scrolled');
					}
					var activeSection = $('.section.active');
					var fpNav = $('#fp-nav');
					
					/*
					 * Preserve the established homepage reset.
					 * On case studies, let fullPage and scrollOverflow control
					 * the internal section position without interference.
					 */
					if (focusEntryTarget) {
						// Entered by keyboard focus: show the focused element
						// instead of resetting the section to its top.
						revealFocusedElement(focusEntryTarget);
						focusEntryTarget = null;
					} else if (!isCaseStudyPage || sectionEntryWasExplicit) {
						resetSectionOverflow(activeSection);

						window.setTimeout(function () {
							resetSectionOverflow($('.section.active'));
						}, 100);
					}

					sectionEntryWasExplicit = false;

					if (!activeSection.hasClass('section-anim')) {
						// uncomment below for onetime animation
						activeSection.addClass('section-anim');
					} 
					if (activeSection.hasClass('section-text-bright')) {
						// uncomment below for onetime animation
						siteHeaderFooter.addClass('text-bright');
						fpNav.addClass('text-bright');
					} else {
						siteHeaderFooter.removeClass('text-bright');
						fpNav.removeClass('text-bright');
					}
					if (activeSection.hasClass('section-text-dark')) {
						// uncomment below for onetime animation
						siteHeaderFooter.addClass('text-dark');
						fpNav.addClass('text-dark');
					} else {
						siteHeaderFooter.removeClass('text-dark');
						fpNav.removeClass('text-dark');
					}
					// hide or show clock
					if (activeSection.hasClass('hide-clock')) {
						headerContainer.addClass('gone');
					} else {
						headerContainer.removeClass('gone');
					}
				}
			});

			// Follow keyboard focus between fullPage sections (see
			// revealFocusedElement above). Only sections are watched, so the
			// menu, the lightbox and its focus return are left alone. In
			// responsive mode the page scrolls normally and needs no help.
			function followFocus(target) {
				if (
					!document.documentElement.classList.contains('fp-enabled') ||
					document.body.classList.contains('fp-responsive') ||
					!target ||
					typeof target.closest !== 'function'
				) {
					return;
				}

				var section = target.closest('#mainpage > .section');

				if (!section) {
					return;
				}

				if (!section.classList.contains('active')) {
					clearNativeFocusScroll(target);
					focusEntryTarget = target;
					// silentMoveTo runs afterLoad synchronously, which then
					// reveals the target.
					$.fn.fullpage.silentMoveTo(
						$(section).index('#mainpage > .section') + 1
					);
					focusEntryTarget = null;
				} else {
					revealFocusedElement(target);
				}

				// Some browsers scroll the focused element into view after
				// focusin has fired, so check again on the next frame.
				window.requestAnimationFrame(function () {
					if (document.activeElement === target) {
						revealFocusedElement(target);
					}
				});
			}

			document.addEventListener('focusin', function (event) {
				followFocus(event.target);
			});

			// Tabbing into a cross-origin iframe (the Cal.com embed) fires
			// no focusin in this document, only a window blur, after which
			// the iframe is the active element.
			window.addEventListener('blur', function () {
				window.setTimeout(function () {
					var active = document.activeElement;

					if (active && active.tagName === 'IFRAME') {
						followFocus(active);
					}
				}, 0);
			});

			// Focus moving inside the Cal.com iframe (Home contact section)
			// can still scroll that section's overflow wrapper natively.
			// Hand any such offset to iScroll so both agree on the position.
			// Registered only where the embed exists, and acts only while
			// the embed's iframe has focus inside the scrolled wrapper.
			var calFocusEmbed = document.getElementById('my-cal-inline-25m');

			function handOffCalFocusScroll(event) {
				var node = event.target;
				var active = document.activeElement;

				if (
					!node ||
					node.nodeType !== 1 ||
					!node.classList.contains('fp-scrollable') ||
					!node.scrollTop ||
					!active ||
					active.tagName !== 'IFRAME' ||
					!calFocusEmbed.contains(active) ||
					!node.contains(active) ||
					document.body.classList.contains('fp-responsive')
				) {
					return;
				}

				var offset = node.scrollTop;
				var scroller = $(node).data('iscrollInstance');

				node.scrollTop = 0;

				if (scroller && typeof scroller.scrollTo === 'function') {
					scroller.scrollTo(
						0,
						Math.max(scroller.maxScrollY, Math.min(0, scroller.y - offset)),
						0
					);
				}
			}

			if (calFocusEmbed) {
				document.addEventListener('scroll', handOffCalFocusScroll, true);
			}

			// Cal.com's inline embed (index.php contact section) can finish
			// resizing after fullPage has already measured this section's
			// scrollOverflow height, leaving the internal scrollbar too
			// short to reach the colophon. Watch the embed's own container
			// (Cal.com resizes it directly via postMessage) and ask
			// fullPage to remeasure once it settles. Debounced so a burst
			// of embed resize events only triggers one rebuild. No-ops on
			// every page other than the one with this embed.
			var calEmbedEl = document.getElementById('my-cal-inline-25m');
			if (calEmbedEl && window.ResizeObserver) {
				var calResizeTimer;
				var calResizeObserver = new ResizeObserver(function () {
					clearTimeout(calResizeTimer);
					calResizeTimer = setTimeout(function () {
						if ($.fn.fullpage && typeof $.fn.fullpage.reBuild === 'function') {
							$.fn.fullpage.reBuild();
						}
					}, 200);
				});
				calResizeObserver.observe(calEmbedEl);
			}

			// Cigna "solution" section: this gallery's images use
			// loading="lazy" with no width/height, so their final height
			// isn't known until they load -- which can happen after
			// fullPage has already measured this section's scrollOverflow
			// height, leaving the internal scrollbar too short to reach
			// the content below the gallery. Watch the gallery's own
			// container and ask fullPage to remeasure once it settles.
			// Debounced so a burst of image-load events only triggers one
			// rebuild, and disconnected after that first rebuild so later
			// gallery navigation (which can also resize the container as
			// Swiper preloads slides) doesn't repeatedly reset the
			// section's scroll position. No-ops on every page other than
			// this one.
			var cignaGalleryEl = document.getElementById('cigna-deck-gallery');
			if (cignaGalleryEl && window.ResizeObserver) {
				var cignaGalleryResizeTimer;
				var cignaGalleryResizeObserver = new ResizeObserver(function () {
					clearTimeout(cignaGalleryResizeTimer);
					cignaGalleryResizeTimer = setTimeout(function () {
						if ($.fn.fullpage && typeof $.fn.fullpage.reBuild === 'function') {
							$.fn.fullpage.reBuild();
						}
						cignaGalleryResizeObserver.disconnect();
					}, 200);
				});
				cignaGalleryResizeObserver.observe(cignaGalleryEl);
			}
		}
	});
// Reset a fullPage overflow section to its beginning.
function resetSectionOverflow($section) {
	if (!$section || !$section.length) {
		return;
	}

	$section.find('.fp-scrollable').each(function () {
		var $scrollable = $(this);
		var scroller = $scrollable.data('iscrollInstance');

		if (scroller && typeof scroller.scrollTo === 'function') {
			scroller.scrollTo(0, 0, 0);
		}

		this.scrollTop = 0;
	});
}

	// Move one fullPage section and ensure the destination starts at the top.
	function moveSectionAndReset(direction) {
		var $activeSection = $('.page-fullpage .section.active');

		var $targetSection = direction === 'down'
			? $activeSection.nextAll('.section').first()
			: $activeSection.prevAll('.section').first();

		resetSectionOverflow($targetSection);

		if (direction === 'down') {
			$.fn.fullpage.moveSectionDown();
		} else {
			$.fn.fullpage.moveSectionUp();
		}

		window.setTimeout(function () {
			resetSectionOverflow($targetSection);
		}, 750);
	}

	// Scroll to the next section.
	$('.scrolldown .down, .scroll.down')
		.on('click', function (event) {
			event.preventDefault();

			if (
				!$('body').hasClass('fp-responsive') &&
				$.fn.fullpage &&
				typeof $.fn.fullpage.moveSectionDown === 'function'
			) {
				moveSectionAndReset('down');
				return;
			}

			var currentSection = this.closest('.section');
			var nextSection = currentSection
				? currentSection.nextElementSibling
				: null;

			while (
				nextSection &&
				!nextSection.classList.contains('section')
			) {
				nextSection = nextSection.nextElementSibling;
			}

			if (nextSection) {
				nextSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});

	// Scroll to the previous section.
	$('.scrolldown .up, .scroll.up')
		.on('click', function (event) {
			event.preventDefault();

			if (
				!$('body').hasClass('fp-responsive') &&
				$.fn.fullpage &&
				typeof $.fn.fullpage.moveSectionUp === 'function'
			) {
				moveSectionAndReset('up');
				return;
			}

			var href = this.getAttribute('href');

			if (href && href.charAt(0) === '#') {
				var sectionName = href.substring(1);
				var target = document.querySelector(
					'#' + sectionName +
						', .section[data-section="' + sectionName + '"]'
				);

				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});

					return;
				}
			}

			var currentSection = this.closest('.section');
			var previousSection = currentSection
				? currentSection.previousElementSibling
				: null;

			while (
				previousSection &&
				!previousSection.classList.contains('section')
			) {
				previousSection = previousSection.previousElementSibling;
			}

			if (previousSection) {
				previousSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});

	// 8. Hide some ui on scroll
	var scrollHeight = $(document).height() - contextWindow.height();
	contextWindow.on('scroll', function () {
		var scrollpos = $(this).scrollTop();
		var siteHeaderFooter = $('.page-footer, .page-header');

		// if (scrollpos > 10 && scrollpos < scrollHeight - 100) {
		if (scrollpos > 100) {
			siteHeaderFooter.addClass("scrolled");
		}
		else {
			siteHeaderFooter.removeClass("scrolled");
		}
	});


	// 9. Page Loader : hide loader when all are loaded
	contextWindow.on('load', function () {
		$('#page-loader').addClass('p-hidden');
		$('.section').addClass('anim');
	});

	// 10. cursor position
	var shadowBall = $(".cursor-ball");
	$(".body-page").mousemove(function(e) {
		shadowBall.css("transform", "translateX(" + e.pageX + "px)");
		// shadowBall.css("transform", "translate(" + e.pageX + "px," + e.pageY +"px)");
		// shadowBall.posx.value = e.pageX;
		// shadowBall.posy.value = e.pageY;
	});

	// 11. Home "Selected work" chip filter. No-ops on every page other
	// than Home, and on Home if the chip/card markup isn't present.
	(function initProjectLensFilter() {
		var $section = $('[data-section="select-projects"]');
		var $lenses = $section.find('.project-lens');
		var $cards = $section.find('.projects-grid > .col[data-category]');

		if (!$section.length || !$lenses.length || !$cards.length) {
			return;
		}

		$lenses.on('click', function () {
			var $clicked = $(this);
			var filter = $clicked.attr('data-filter');

			$lenses.removeClass('is-active').attr('aria-pressed', 'false');
			$clicked.addClass('is-active').attr('aria-pressed', 'true');

			$cards.each(function () {
				var $card = $(this);

				if (filter === 'all') {
					$card.removeClass('project-filtered-out');
					return;
				}

				var categories = ($card.attr('data-category') || '').split(/\s+/);

				if (categories.indexOf(filter) !== -1) {
					$card.removeClass('project-filtered-out');
				} else {
					$card.addClass('project-filtered-out');
				}
			});
		});
	})();

});

document.querySelectorAll('.current-year').forEach(function (year) {
  year.textContent = new Date().getFullYear();
});
