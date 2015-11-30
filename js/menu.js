var navCloseBtn     = document.getElementById('nav-close-button'),
    navOpenBtn      = document.getElementById("nav-icon"),
    nav             = document.getElementsByTagName("nav")[0],
    navTitle        = document.getElementsByClassName("nav-title")[0],
    navLinks        = nav.getElementsByTagName("a"),
    content         = document.getElementsByClassName("container")[0].children,
    w               = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    elHeight		= 0,
    dHeight			= 0,
    wHeight			= 0,
    wScrollCurrent	= 0,
    wScrollBefore	= 0,
    wScrollDiff		= 0,
    headerList      = document.querySelectorAll("h1, h2, h3, h4");

navOpenBtn.addEventListener('click', function (e) {
  nav.classList.add('expanded');
  navTitle.classList.add('expanded');
  for (var i = 0; i < content.length; i++) {
    if (content[i].tagName !== "NAV" ) {
      content[i].classList.add('nav-active');
    }
  }
  e.preventDefault();
});

navCloseBtn.addEventListener('click', function (e) {
  nav.classList.remove('expanded');
  navTitle.classList.remove('expanded');
  for (var i = 0; i < content.length; i++) {
    content[i].classList.remove('nav-active');
  }
  e.preventDefault();
});

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    if (w <= 700) {
      nav.classList.remove('expanded');
      navOpenBtn.classList.remove('hide');
      for (var j = 0; j < content.length; j++) {
        content[j].classList.remove('nav-active');
      }
    }
    // e.preventDefault();
  });
}

window.addEventListener( 'scroll', function() {
    elHeight		= navOpenBtn.offsetHeight;
    dHeight			= document.body.offsetHeight;
    wHeight			= window.innerHeight;
    wScrollCurrent	= window.pageYOffset;
    wScrollDiff		= wScrollBefore - wScrollCurrent;
    if( wScrollCurrent <= 60 ) {
      // scrolled to the very top
      navOpenBtn.classList.remove('hide');
      navOpenBtn.classList.remove('bordered');
    } else if ( wScrollDiff > 0 ) {
      // scrolled up
      navOpenBtn.classList.remove('hide');
      navOpenBtn.classList.add('bordered');
    } else if ( wScrollDiff < 0 ) {
      // scrolled down
      if ( wScrollCurrent + wHeight >= dHeight - elHeight ) {
        // scrolled to the very bottom; element slides in
        navOpenBtn.classList.remove('hide');
      } else {
        navOpenBtn.classList.add('hide');
      }
    }
    wScrollBefore = wScrollCurrent;
});

var listCurrentDepth = 0,
    listPreviousDepth = 0,
    listContent = "Hello",
    listID = "anchor-",
    listCurrentAll = "",
    listNode;

while (nav.firstChild) {
  nav.removeChild(nav.firstChild);
}

nav.classList.add('expanded');
navTitle.classList.add('expanded');

for (var i = 0; i < headerList.length; i++) {
  listCurrentDepth = parseInt(headerList[i].tagName.substr(1));
  listContent = headerList[i].innerText;
  listNode = headerList[i].cloneNode(true);
  listID = "anchor-" + listContent.replace(new RegExp(" ", "g"), "-").toLowerCase();

  headerList[i].id = listID;

  if (listCurrentDepth == listPreviousDepth) {
    listCurrentAll = listCurrentAll + "</li><li><a href='#" + listID + "'>" + listContent + "</a>";

  } else if (listCurrentDepth > listPreviousDepth) {
    listCurrentAll = listCurrentAll + "<ol><li><a href='#" + listID + "'>" + listContent + "</a>";

  } else if (listPreviousDepth == (listCurrentDepth + 1)) {
    listCurrentAll = listCurrentAll + "</li></ol></li><li><a href='#" + listID + "'>" + listContent + "</a>";

  } else if (listPreviousDepth == (listCurrentDepth + 2)) {
    listCurrentAll = listCurrentAll + "</li></ol></li></ol></li><li><a href='#" + listID + "'>" + listContent + "</a>";

  } else if (listPreviousDepth == (listCurrentDepth + 3)) {
    listCurrentAll = listCurrentAll + "</li></ol></li></ol></li></ol></li><li><a href='#" + listID + "'>" + listContent + "</a>";
  }

  listPreviousDepth = listCurrentDepth;
}

nav.innerHTML = listCurrentAll + "</li></ol>";
