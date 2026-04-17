---
layout: page
title: Paper Presentations
permalink: /papers/
---

<div class="home">
  <p>
  I read some papers, and sometimes I took notes to record what I have learned. I find that putting these insights into a brief, quick slideshow helps me revisit the main ideas later almost as a sort of personal mini-presentation. Here’s a collection of all the slides I’ve created. Feel free to explore and tell me if you have any feedback.
  </p><br>
  <div class="search-wrapper">
		<div class="search-box">
			<i class="fab fa-magnify"></i>
			<input type="text" id="slide-search" placeholder="Search slides..." oninput="filterSlides(this.value)"/>
			<button class="clear-btn" id="clear-btn" onclick="clearSearch()" aria-label="Clear search">&#x2715;</button>
		</div>
  </div>
  <ul class="posts">
    {% assign pinned = site.slides | where: "pinned", true %}
    {% assign others = site.slides | where_exp: "item", "item.pinned != true" | reverse %}
    {% assign slides = pinned | concat: others %}
    {% for slide in slides %}
      <li>
        <span class="post-date">{{ slide.date | date: "%b %-d, %Y" }}</span>
        <a class="post-link" href="{{ slide.url | prepend: site.baseurl }}">{{ slide.title }}</a>
        <br>
        {{ slide.biblio }}
      </li>
    {% endfor %}
  </ul>
	<p class="no-results" id="no-results" style="display:none;">No slides found.</p>
</div>

<script>
	function filterSlides(query) {
		const items = document.querySelectorAll('.posts li');
		const clearBtn = document.getElementById('clear-btn');
  	const noResults = document.getElementById('no-results');
		query = query.toLowerCase().trim();
		let visibleCount = 0;

		clearBtn.style.display = query ? 'block' : 'none';
		items.forEach(function(item) {
			const text = item.textContent.toLowerCase();
			const match = !query || text.includes(query);
			item.style.display = match ? '' : 'none';
			if (match) visibleCount++;
		});

		noResults.style.display = visibleCount === 0 && query ? 'block' : 'none';
	}

	function clearSearch() {
		const input = document.getElementById('slide-search');
		input.value = '';
		filterSlides('');
		input.focus();
	}
</script>