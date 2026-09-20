<?php $socialLinksShowResume = $socialLinksShowResume ?? true; ?>
<ul class="social-text">
<?php if ($socialLinksShowResume): ?>
  <li>
    <a
      class="icon-btn"
      href="/resume.pdf"
      aria-label="Download Skipper's PDF resume"
      title="Skipper's PDF resume"
      target="_blank"
      rel="noopener"
    >
      <i class="icon fa-regular fa-file"></i>
    </a>
  </li>
<?php endif; ?>

  <li>
    <a
      class="icon-btn"
      href="https://www.linkedin.com/in/skipperchongwarson/"
      aria-label="LinkedIn"
      title="LinkedIn"
      target="_blank"
      rel="noopener"
    >
      <i class="icon fa-brands fa-linkedin"></i>
    </a>
  </li>

  <li>
    <a
      class="icon-btn"
      href="https://skipperchongwarson.medium.com/"
      aria-label="Medium"
      title="Medium"
      target="_blank"
      rel="noopener"
    >
      <i class="icon fa-brands fa-medium"></i>
    </a>
  </li>

  <li>
    <a
      class="icon-btn"
      href="https://speakerdeck.com/skipperchong"
      aria-label="Speaker Deck"
      title="Speaker Deck"
      target="_blank"
      rel="noopener"
    >
      <i class="icon fa-brands fa-speaker-deck"></i>
    </a>
  </li>

  <li>
    <a
      class="icon-btn"
      href="https://www.instagram.com/skipperchong/"
      aria-label="Instagram"
      title="Instagram"
      target="_blank"
      rel="noopener"
    >
      <i class="icon fa-brands fa-instagram"></i>
    </a>
  </li>
</ul>
<?php unset($socialLinksShowResume); ?>