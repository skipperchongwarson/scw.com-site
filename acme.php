                        </figure>
                      </div>
                    </div>
                    <div class="items-pagination bar"></div>
                    <div class="items-button bottom fit items-button-prev"><button type="button" class="btn btn-transp-arrow btn-primary" aria-label="Previous image"><span class="icon arrow-left" aria-hidden="true"></span></button></div>
                    <div class="items-button bottom fit items-button-next"><button type="button" class="btn btn-transp-arrow btn-primary" aria-label="Next image"><span class="icon arrow-right" aria-hidden="true"></span></button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact -->
    <div class="section section-description fp-auto-height-responsive" data-section="impact">
      <div class="section-cover-full">
        <div class="cover-container">
          <div class="row gx-0">
            <div class="col-auto col-lg-8 bg-part"></div>
            <div class="col-12 col-lg-4 bg-part bg-img" data-image-src="/img/items/acme-project.jpg"></div>
          </div>
        </div>
      </div>
      <div class="section-wrapper fullwidth fullheight with-margin mobile-section-spacing">
        <div class="section-content anim">
          <div class="row justify-content-between">
            <div class="col-12 col-md-6 col-lg-5 text-left center-v pr-md-5 pr-lg-0">
              <div class="wrapper">
                <div class="title-desc">
                  <h2 class="display-4 display-title mb-4 anim-1">A different problem, with a ~$2M modeled opportunity</h2>
                  <p class="anim-2">Using the client’s business-case assumptions, reducing approval-stage abandonment was modeled as a potential 10% increase in service signups.</p>
                  <p class="anim-2">For the relevant customer segment, that represented approximately <strong>$2M in projected annual retained revenue</strong>.</p>
                  <p class="anim-2">We did not track subsequent implementation or realized revenue. The supported outcome is the strategic reframe, the resulting CX recommendations, and the modeled business opportunity—not a claim that the engagement generated $2M.</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-5"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conclusion -->
    <div class="section section-contact fp-auto-height-responsive no-slide-arrows" data-section="conclusion">
      <div class="section-cover-full fit bg-color"></div>
      <div class="section-wrapper fullwidth fullheight with-margin mobile-section-spacing">
        <div class="section-content fullwidth anim text-left">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="title-desc">
                <div class="anim-2">
                  <h2 class="display-4 display-title">Ten conversations changed the order of the problem</h2>
                  <p class="anim-2">The company had extensive customer evidence before we arrived. The issue was not the absence of data; it was how that evidence had been organized into a problem hierarchy.</p>
                  <p class="anim-2">Direct conversations showed that uncertainty about credit, timing, approval, and next steps could stop customers before monthly affordability became the immediate decision.</p>
                  <p class="anim-2">That changed what deserved attention in the future experience: not only making financing more affordable, but making the path through financing clear enough for customers to continue.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="related-projects">
            <h2 class="related-projects-title">Other select projects</h2>
            <div class="slider-wrapper carousel-swiper-beta carousel-swiper-beta-demo anim-3">
              <div class="slider-container swiper-container"><ul class="item-list swiper-wrapper">
                <?php include 'carousel.php'; ?>
              </ul></div>
              <div class="items-pagination bar"></div>
              <div class="items-button bottom fit items-button-prev"><button type="button" class="btn btn-transp-arrow btn-primary" aria-label="Previous related project"><span class="icon arrow-left" aria-hidden="true"></span><span class="text">Prev</span></button></div>
              <div class="items-button bottom fit items-button-next"><button type="button" class="btn btn-transp-arrow btn-primary" aria-label="Next related project"><span class="text">Next</span><span class="icon arrow-right" aria-hidden="true"></span></button></div>
            </div>
          </div>

          <div class="contact-page-end">
            <div class="contact-page-end__toolbar"><footer class="site-footer-social" aria-label="Social links"><?php include 'social-links.php'; ?></footer></div>
            <?php include 'colophon.php'; ?>
          </div>
        </div>
      </div>
    </div>
  </main>

  <?php include 'scripts-others.php'; ?>
  <script>
    $(document).ready(function() {
      setTimeout(function() {
        var dotNames = ["Introduction", "Problem", "Insight", "Solution", "Impact", "Conclusion"];
        $('#fp-nav ul li a').each(function(index) { if (dotNames[index]) $(this).attr('title', dotNames[index]); });
      }, 600);
    });
  </script>
  <script>
  (function () {
    const railLinks = document.querySelectorAll('.responsive-dot-rail a');
    function name(link) { return link.getAttribute('href').split('#').pop(); }
    function activate(sectionName) { railLinks.forEach(function (link) { link.classList.toggle('is-active', name(link) === sectionName); }); }
    railLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (!document.body.classList.contains('fp-responsive')) return;
        event.preventDefault(); event.stopPropagation();
        const sectionName = name(link);
        if (sectionName === 'top') { window.scrollTo(0, 0); activate('top'); window.history.replaceState(null, '', '#top'); return; }
        const target = document.querySelector('.section[data-section="' + sectionName + '"]');
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); activate(sectionName); window.history.replaceState(null, '', '#' + sectionName);
      });
    });
    const sections = document.querySelectorAll('.section[data-section]');
    if (!sections.length) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.getAttribute('data-section'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
    activate(sections[0].getAttribute('data-section'));
  })();
  </script>
</body>
</html>