"use strict";

var mainMenuSidebar = document.getElementsByClassName('main-menu-sidebar')[0];
var mainMenuOverlay = document.getElementsByClassName('main-menu__overlay')[0];
var mainMenuBtn = document.getElementsByClassName('conversations__main-menu-btn')[0];

var openMainMenu = function openMainMenu() {
  mainMenuSidebar.classList.remove("main-menu__sidebar--hidden");
  mainMenuOverlay.classList.remove("main-menu__overlay--hidden");
};

var closeMainMenu = function closeMainMenu() {
  mainMenuSidebar.classList.add("main-menu__sidebar--hidden");
  mainMenuOverlay.classList.add("main-menu__overlay--hidden");
};

mainMenuBtn.addEventListener('click', openMainMenu);
mainMenuOverlay.addEventListener('click', closeMainMenu);

function showChat() {
  document.getElementsByClassName('chat-header')[0].classList.remove("chat-header--hidden");
  document.getElementsByClassName('chat-body')[0].classList.remove("chat-body--hidden");
  document.getElementsByClassName('chat-footer')[0].classList.remove("chat-footer--hidden");
  document.getElementsByClassName('chat__start_overlay')[0].classList.add("chat__start_overlay--hidden");
}

function isSelectedConversationExist(item) {
  return typeof item !== "undefined" ? true : false;
}

function chooseChatFooter(item) {
  var chatFooter = document.getElementById("chat-footer-chat");
  var channelFooter = document.getElementById("chat-footer-channel");

  if (item.classList.contains("conversations-item--channel")) {
    chatFooter.classList.add("chat-footer__inner--hidden");
    channelFooter.classList.remove("chat-footer__inner--hidden");
  } else {
    chatFooter.classList.remove("chat-footer__inner--hidden");
    channelFooter.classList.add("chat-footer__inner--hidden");
  }
}

function setChatName(thisConversation) {
  var thisConversationName = thisConversation.getElementsByClassName("conversations-item__author")[0];
  var chatConversationName = document.getElementsByClassName("chat-header__chat-name")[0];
  chatConversationName.textContent = thisConversationName.textContent;
}

function selectConversation() {
  var selectedConversation = document.getElementsByClassName('conversations-item--selected')[0];

  if (!isSelectedConversationExist(selectedConversation)) {
    showChat();
  }

  if (isSelectedConversationExist(selectedConversation)) {
    selectedConversation.classList.toggle("conversations-item--selected");
    var selectedCoversationChat = document.getElementById(selectedConversation.id + "-chat");
    selectedCoversationChat.classList.toggle("chat-body__conversation-chat--selected");
  }

  this.classList.toggle("conversations-item--selected");
  var thisConversationChat = document.getElementById(this.id + "-chat");
  thisConversationChat.classList.toggle("chat-body__conversation-chat--selected");
  chooseChatFooter(this);
  setChatName(this);
}

var conversationsItems = document.getElementsByClassName('conversations-item');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = conversationsItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;
    item.addEventListener('click', selectConversation);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function changeSystemInterface() {
  this.checked = true;
  var systemBars = document.getElementsByClassName("system-interface__elements");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = systemBars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var systemBar = _step2.value;
      systemBar.classList.toggle("system-interface__elements--hidden");
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

var systemInterfaceRadios = document.getElementsByName("system");
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = systemInterfaceRadios[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var radio = _step3.value;
    radio.addEventListener('change', changeSystemInterface);
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

function changeBgImage() {
  var chatStartOverlay = document.getElementsByClassName("chat__start_overlay")[0];
  var chatBody = document.getElementsByClassName("chat-body")[0];
  var bgUrl = document.getElementById("bg-changer").value;

  if (bgUrl !== "") {
    chatStartOverlay.style.backgroundImage = "url(" + bgUrl + ")";
    chatBody.style.backgroundImage = "url(" + bgUrl + ")";
  }
}

var BgChangingButton = document.getElementById("bg-changer-btn");
BgChangingButton.addEventListener('click', changeBgImage);

function changeBg() {
  var color = this.value;
  var pickerId = this.id;
  var element = document.getElementsByClassName(pickerId)[0];
  element.style.backgroundColor = color;
  console.log(pickerId + ": " + color + ";");
}

var colorPickers = document.getElementsByClassName('picker');
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = colorPickers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var picker = _step4.value;
    picker.addEventListener('change', changeBg);
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

var pickers = document.getElementsByClassName("picker");
var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
  for (var _iterator5 = pickers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var _picker = _step5.value;
    var element = document.getElementsByClassName(_picker.id)[0];
    var style = getComputedStyle(element);
    _picker.value = rgb2hex(style.backgroundColor);
    console.log(rgb2hex(style.backgroundColor));
  }
} catch (err) {
  _didIteratorError5 = true;
  _iteratorError5 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
      _iterator5.return();
    }
  } finally {
    if (_didIteratorError5) {
      throw _iteratorError5;
    }
  }
}

function makeTheme() {
  var themeTextField = document.getElementsByClassName("theme-text-field")[0];
  themeTextField.value = "$dialogsBg: " + document.getElementById("$dialogsBg").value + ";\n" + "$topBarBg: " + document.getElementById("$topBarBg").value + ";\n" + "$searchedBarBg: " + document.getElementById("$searchedBarBg").value + ";\n" + "$titleBg: " + document.getElementById("$titleBg").value + ";";
}