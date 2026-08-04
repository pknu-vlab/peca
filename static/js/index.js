document.addEventListener('DOMContentLoaded', () => {
  const abstractSection = document.getElementById('abstract');
  if (abstractSection) {
    abstractSection.classList.add('visible');
    abstractSection.querySelector('.section-label').textContent = 'Abstract';
    const abstractTitle = abstractSection.querySelector('h2');
    if (abstractTitle) abstractTitle.textContent = 'Heterogeneous cameras need a heterogeneous benchmark.';
    const paragraphs = abstractSection.querySelectorAll(':scope > p');
    if (paragraphs[0]) paragraphs[0].textContent = 'Modern stereo-capable smartphones enable immersive XR content capture. However, hardware heterogeneity across camera modules often causes severe asymmetric blur artifacts. Existing methods and benchmarks largely assume homogeneous stereo setups and therefore do not explicitly address such asymmetric degradation. To bridge this gap, we present a dedicated framework for heterogeneous stereo deblurring.';
    if (paragraphs[1]) paragraphs[1].innerHTML = 'First, we introduce the <strong>heterogeneous stereo deblurring (HSD) dataset</strong>, constructed from real smartphone stereo captures via multi-frame integration. Second, we propose <strong>physically- and epipolar-constrained cross attention (PECA)</strong>, a lightweight module that restricts cross-view matching to an epipolar search window bounded by a optics-derived disparity upper bound. By enforcing physically valid disparity constraints, PECA enables efficient and reliable cross-view feature fusion. Moreover, our confidence-weighted attention with residual fusion emphasizes cross-guided deblurring when correspondences are reliable, while naturally falling back to self-deblurring in occluded or unreliable regions. PECA is architecture-agnostic and consistently improves CNN-, Transformer-, and NAFNet-based baselines. Extensive experiments on HSD show that PECA-enhanced models achieve improved restoration performance with favorable efficiency.';

    const stats = abstractSection.querySelector('.stats');
    const datasetWrap = document.querySelector('#dataset .wrap');
    if (stats && datasetWrap) {
      stats.lastElementChild?.remove();
      const datasetFigure = datasetWrap.querySelector('.figure-card');
      datasetWrap.insertBefore(stats, datasetFigure);
    }
  }

  const venue = document.querySelector('.eyebrow');
  if (venue) venue.innerHTML = '&#127942; Accepted at <a href="https://eccv.ecva.net/Conferences/2026" target="_blank" rel="noopener">ECCV 2026</a> &#127942;';

  const authors = document.querySelector('.authors');
  if (authors) {
    authors.innerHTML = `
      <span><a href="https://www.linkedin.com/in/hoju-shin-36512931b" target="_blank" rel="noopener">Hoju Shin</a><sup>*,1</sup></span>
      <span><a href="https://www.linkedin.com/in/jiah-kim-868577244/" target="_blank" rel="noopener">Jiah Kim</a><sup>*,1</sup></span>
      <span><a href="https://kr.linkedin.com/in/%EC%8A%B9%EC%9A%B1-%EA%B9%80-003a7310a" target="_blank" rel="noopener">Seung-Wook Kim</a><sup>†,1</sup></span>
      <span><a href="https://kr.linkedin.com/in/seowon-ji-7587741a9" target="_blank" rel="noopener">Seowon Ji</a><sup>†,2</sup></span>`;
  }
  const affiliations = document.querySelector('.affiliations');
  if (affiliations) affiliations.innerHTML = '<span><sup>1</sup> Department of Intelligent Robot Engineering, Pukyong National University</span><span><sup>2</sup> Department of Computer Science and Engineering, Konkuk University</span><small><sup>*</sup> Equal contribution &nbsp;&nbsp; <sup>†</sup> Corresponding authors</small>';
  const actions = document.querySelector('.hero-actions');
  if (actions) {
    actions.innerHTML = `
      <a class="button primary" href="static/pdfs/PECA.pdf" target="_blank" rel="noopener"><i class="fas fa-file-pdf" aria-hidden="true"></i> Paper</a>
      <a class="button" href="https://arxiv.org/abs/2606.25962" target="_blank" rel="noopener"><i class="ai ai-arxiv" aria-hidden="true"></i> arXiv</a>
      <a class="button" href="https://github.com/shinhoju/PECA" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
      <a class="button" href="https://huggingface.co/datasets/hj-shin/Heterogeneous-Stereo-Deblurring" target="_blank" rel="noopener"><i class="fas fa-database" aria-hidden="true"></i> Data</a>
      <a class="button" href="#citation"><i class="fas fa-quote-right" aria-hidden="true"></i> BibTeX</a>`;
  }
  const lead = document.querySelector('.lead');
  if (lead) lead.textContent = 'PECA consistently improves diverse deblurring backbones while restoring sharper details from a wide-camera reference.';

  document.querySelectorAll('.figure-slider').forEach(slider => {
    const slides = [...slider.querySelectorAll('.method-slide')];
    const dots = [...slider.querySelectorAll('.slider-dot')];
    let currentSlide = 0;
    const showSlide = index => {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentSlide);
        dot.setAttribute('aria-selected', String(i === currentSlide));
      });
    };
    slider.querySelector('.slider-prev').addEventListener('click', () => showSlide(currentSlide - 1));
    slider.querySelector('.slider-next').addEventListener('click', () => showSlide(currentSlide + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    slider.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
      if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));

  const button = document.getElementById('copy-bibtex');
  button?.addEventListener('click', async () => {
    const citation = document.getElementById('bibtex').textContent;
    try {
      await navigator.clipboard.writeText(citation);
      button.textContent = 'Copied!';
      setTimeout(() => { button.textContent = 'Copy citation'; }, 1800);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('bibtex'));
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Selected';
    }
  });
});
