<?php
$carouselProjects = [
  [
    'id' => 'replay',
    'href' => '/replay/',
    'img' => '/img/items/replay-project.jpg',
    'alt' => 'Replay project',
    'meta' => 'Customer discovery · Developer tools · 2025-present',
    'title' => 'Replay',
  ],
  [
    'id' => 'duke',
    'href' => '/duke/',
    'img' => '/img/items/duke-project.jpg',
    'alt' => 'Duke project',
    'meta' => 'Design &amp; research sprints · Energy · Nov 2022–Jul 2024',
    'title' => 'Duke Energy',
  ],
  [
    'id' => 'shep',
    'href' => '/shep/',
    'img' => '/img/items/shep-project.png',
    'alt' => 'Shep project',
    'meta' => 'Fractional product & design · Travel tech • 2017–2021',
    'title' => 'Shep',
  ],
  [
    'id' => 'sesame',
    'href' => '/sesame/',
    'img' => '/img/items/sesame-project.jpg',
    'alt' => 'Sesame project',
    'meta' => 'Founding designer · Healthcare · Aug 2018–Aug 2019',
    'title' => 'Sesame',
  ],
  [
    'id' => 'softserve',
    'href' => '/softserve/',
    'img' => '/img/items/softserve-project.jpg',
    'alt' => 'SoftServe project',
    'meta' => 'Regional design director, Americas · Distributed teams · 2021–2024',
    'title' => 'SoftServe',
  ],
  [
    'id' => 'cigna-smart-toothbrush',
    'href' => '/cigna-smart-toothbrush/',
    'img' => '/img/items/cigna-project.jpg',
    'alt' => 'Cigna smart toothbrush',
    'meta' => 'Design director, SoftServe · Healthcare · Eight-week proof of concept • Apr 2022',
    'title' => 'Cigna smart toothbrush',
  ],
  [
    'id' => 'bank-of-america-bankers',
    'href' => '/bank-of-america-bankers/',
    'img' => '/img/items/BOA-bankers-project.png',
    'alt' => 'Bank of America bankers CRM',
    'meta' => 'Lead designer and player-coach, Fjord · Financial services · 2017',
    'title' => 'Bank of America commercial CRM',
  ],
  [
    'id' => 'bank-of-america-investors',
    'href' => '/bank-of-america-investors/',
    'img' => '/img/items/BOA-investors-project.png',
    'alt' => 'Bank of America - investor research',
    'meta' => 'Mostly IC senior designer, Fjord · Financial services · 2018',
    'title' => 'Bank of America investor research',
  ],
];
?>
<?php foreach ($carouselProjects as $project): ?>
<?php if ($project['id'] === ($currentProjectId ?? null)) continue; ?>
              <!-- item -->
              <li class="slide-item swiper-slide">
                <div class="item-wrapper">
                  <div class="illustr">
                    <img class="img img-block" src="<?= $project['img'] ?>" alt="<?= $project['alt'] ?>">
                  </div>
                  <div class="legend">
                    <a href="<?= $project['href'] ?>">
                      <p class="legend-eyebrow"><?= $project['meta'] ?></p>
                      <h3><?= $project['title'] ?></h3>
                    </a>
                  </div>
                </div>
              </li>
<?php endforeach; ?>
