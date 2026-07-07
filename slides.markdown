---
layout: page
title: Slides
permalink: /slides/
---

<div class="home">
  <p>
   This is a collection of slides I’ve made for talks/presentations an quick slideshows about some papers to help me revisit the main ideas later. You can search a slide by date, name or any metadata displayed here. Feel free to explore and tell me if you have any feedback.
  </p><br>
  <div class="search-wrapper">
		<div class="search-box">
			<i class="fab fa-magnify"></i>
			<input type="text" id="search" placeholder="Search slides..." oninput="filter(this.value)"/>
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

<script src="/js/search.js"></script>