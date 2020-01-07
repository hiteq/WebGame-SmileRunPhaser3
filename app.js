//game balance
var GRAVITY = 0.6;
var JUMP = 10;
var speed = 2;
var box_rate = 20;
var box_weight = 0.4;
var box_speed = [2, 3.5, 5];
var rotate_angle = [180];
var position_y = [40, 60, 120];

//usage
var player;
var block;
var box_0, box_1, box_2, box_3;
var bg1, bg2, bg3;
var heart;

//Data URI image
var image_box_a_1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeAgMAAAAjs7ROAAAACVBMVEXiPVXwSVv/eJl0VodgAAAANElEQVR4AWNgDIUBHMwQVvxMKpkQtmoVdiZcbdTUldiZYLVozFVITITaVYRNiJqKnUnQFwAym2QtaZGhGAAAAABJRU5ErkJggg==";
var image_box_g_1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhAgMAAAAjYYqGAAAACVBMVEUXwGgXrVuN2K6SNytBAAAAPklEQVR4AWNgDGAIDQ11YAAC7MwQBvxM6pgAAriZIWBSawV2JkwtVwMDdiZYLZi5agF2JlwtEw4mQTcQ9gUArqopHd9Tkt4AAAAASUVORK5CYII=";
var image_box_g9_1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAMAAABzP0xhAAAAElBMVEX////5vgD811L7yiL/63b70DwmvKIKAAAAAXRSTlMAQObYZgAAAFhJREFUeNq10EsOACEIA1BBuP+VbSZ+SJx0VbvQNLyF0n5jZrW+Q/bF3XHqEBv3FVQh4uPjpGiPq4iI6rSIR46cRosyE9e16tMBdGi+qa76diK0fkcDoEMD6XIGghdHfWQAAAAASUVORK5CYII=";
var image_box_smile_1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAiAgMAAABKN5MWAAAACVBMVEX0tmHoplb/xYB7mtRGAAAAR0lEQVR4AZ3KoRUCQAwFsJiaTtcRT3dKgIf4j1PgIqIAFZqPJvTT2z0VmjeeDBX90oaG/VbdMvpSpf540KHi0rAHGyp66dADgalRpd5UfbgAAAAASUVORK5CYII=";
var image_heart =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGCAYAAAAPDoR2AAAAMElEQVR4AWO4HRICwv9BGJ0N5vyfOgWMgWwUDJcE0hgY3dj/6MZiU8AAk0RTgOADAGHXXFPSpAdaAAAAAElFTkSuQmCC";
var image_bg1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAMAQMAAACqflodAAAABlBMVEWlpaX///8ueuZRAAAAAnRSTlP/AOW3MEoAAAAoSURBVHgBY0AF/5HAHyYUKbJ5H2BmY+E9gPL+gXkHoLw/KG55D3ILABqxIVtE3VaRAAAAAElFTkSuQmCC";
var image_bg2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAMAQMAAACqflodAAAABlBMVEWlpaX///8ueuZRAAAAAnRSTlP/AOW3MEoAAAArSURBVHgBY0AF/5HAHyYUKbJ5H6CM/Vh4D6DW1oGpeqjN30G2w93yHsQDAOuNLASIMDB0AAAAAElFTkSuQmCC";
var image_bg3 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAMAQMAAACqflodAAAABlBMVEWlpaX///8ueuZRAAAAAnRSTlP/AOW3MEoAAAARSURBVHgBY0AF/5HAn8HEAwDR9I5RjD0moAAAAABJRU5ErkJggg==";
var image_smile_walk1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8//qrLi4uIZGRnTXl4zyFGCAAAAAXRSTlMAQObYZgAAAG9JREFUeNrt08EOgDAIA1An8P+/7AJxjY3crPFgTxt7S3pho4wzmOCqoOz2jJnlM4bQegqdmYeavE2v0VNoayKlWYW1u6/DnOsoXF9XRuHGSlL6EBEiWh1u+9H2Kmg5JqDIZBqKrqjbrMrj9M83cgB0DghxEx4eNAAAAABJRU5ErkJggg==";
var image_smile_walk2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8//qrLi4uIZGRnTXl4zyFGCAAAAAXRSTlMAQObYZgAAAG5JREFUeNrN00EOgCAMRFG17f2vbMNEJhYMq1H/Cuoj6cbtb+1XZSKj1R0tM+uf85wTaj2lboFmb9N7ekptD+ko9hi1u/dDzjUUbr2umkIg0PIgIkQUO0z3K3+vgsJVQsp0FBp3mwUgoquIVPT7TolyCIN83JMHAAAAAElFTkSuQmCC";
var image_smile_walk3 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8//qrLi4uIZGRnTXl4zyFGCAAAAAXRSTlMAQObYZgAAAGZJREFUeNrt0EEKgDAMRFHbJPe/smXAjDbrCV34F1LjKwSvv9MaT9tERKubyMzwmUNqPaVG6zBRN/2mp9RWw94iyiWKdvc8rLmGQqPxykoyyjaxvUZEG6VGFCrK8pflrm203smnmN4Y1wb3hTd0dQAAAABJRU5ErkJggg==";
var image_smile_walk4 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8//qrLi4uIZGRnTXl4zyFGCAAAAAXRSTlMAQObYZgAAAFxJREFUeNrt0zEOACEIBdFV4P5XXqJZohPbv5VTEfLs5LndUPvCRkbp+sjMcl6X0GpaOsthbv6me0pKbadyr6fU7l4DjJ4yPSXCg4iQ0nkStodbFdE+qhl/NBPTFwkABtN37E6XAAAAAElFTkSuQmCC";
var image_smile_jump1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8//qrLi4uIZGRnTXl4zyFGCAAAAAXRSTlMAQObYZgAAAGdJREFUeNrtkzEKwDAMA5sm+f+XK1JytPYs06E3BCHOoCXHz9dom9C4Vdpz0XtXfpZ6K1VsoXA31eobq8oF4zLqTSoeYI8xCOpL1USB2hZ44WDOaVLZkCeGv+pT8QJ4VpW5bUNW71cvSp8HWsP6+W0AAAAASUVORK5CYII=";
var image_smile_jump2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8/i4uL/qrIZGRnTXl7wwla7AAAAAXRSTlMAQObYZgAAAG5JREFUeNrF1EEKwCAMBVHbxvtfuSGBTqh1+dNZibyACDpeHdEgUlLcGTHAsJTirih13UT30Ch3eih6k5T6UT61mdVFC0XX0mkoDhr9RR9UB+acDRRHPF0NRXurA6ko7Zye4tYfs43mTXm+ADXRGw0/B1r0AxHCAAAAAElFTkSuQmCC";
var image_smile_jump3 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8/i4uL/qrIZGRnTXl7wwla7AAAAAXRSTlMAQObYZgAAAG1JREFUeNq91EEKwCAMBVHbmvtfuSFSJjRk+TMrkZeNouvXFS0iJcXdEQMMSynuiY7Om+gZGp2dGYpuUtJW773zQkyrJpyM+n1AoyFa3YfygJlpaOOIp6uhaK86kIpS5/QUV3/MMXpOyvMFaIi+LxIHJO4t/1QAAAAASUVORK5CYII=";
var image_smile_jump4 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAADPz8/i4uL/qrIZGRnTXl7wwla7AAAAAXRSTlMAQObYZgAAAGlJREFUeNq91DEKACEMRFF3E+9/5YWx+GElZeZXQV4aQdevRy2iSYp7FQssj1JcqKPrIdpD1TnxUHSTgd46M+tgoegazkOVjUZE82ZY2HuPUTSOeLpjFH070Dzt3DzF3T+mgXJTSgPIQj+jywbuBklzCwAAAABJRU5ErkJggg==";
var image_smile_jump5 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAqElEQVR4Ae3WAQbAMAwF0NJdopfrAQfYRYrdoBfpQCgSyk/E+OHDRL3yTQuHA84YY2nJlxEajJtzalHQCRcmVIkbbt2Pmn0HOJPQf0Ot/u07hOZDAbRXYv+jRgg1+wGgW2uSox1CY6EALrq7hEZCkS4aERyet3cJof5Qq6MRiJNLFnsIjYN6dQt5a2ZDCQV6CYCyoITuhyI4gJAPJdT87jS11kuSASX0A8DNP2HcPmxPAAAAAElFTkSuQmCC";
var image_smile_jump6 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEX/qrL/qrLPz8/i4uIZGRnTXl4h7nIlAAAAAXRSTlMAQObYZgAAAHFJREFUeNrtkzEOwCAMA3GB/3+5liysCIZ2sbr0Bgj2ZaQRAO0FCdXer1auRU3Sak177wx5claiOaTqIi6wYFWXc6phqsKqnlFVkXF9ElLPqNpjDA8hFYCKR0Kq2Gw9azjnjKpeIJvdTF41/rQagur33F67CYiG+5KCAAAAAElFTkSuQmCC";
var image_smile_jump7 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAElBMVEUAAAD/qrLPz8/i4uIZGRnTXl481A+7AAAAAXRSTlMAQObYZgAAAG1JREFUeNrtkzEOwDAIA0sh//9yLVmxUBg6eWpvSIh9jLl+QER8WZ3evemJW+1pZiLEiZkJZ5PKC6iIDaq+7FMFUhZS+bSqjITqiUnNxrSrSoNJjQgWr5hUcth89nCtZVW1AA5brU+d6NNycKoPV+4Jf8Aga60AAAAASUVORK5CYII=";

import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: Math.min(Math.max(320, window.screen.width), 640),
  height: 208,
  backgroundColor: "#ffffff",
  parent: "gameframe",
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // "this" === Phaser.Scene
  this.load.image(
    "repeating-background",
    "../assets/images/escheresque_dark.png"
  );
}

function create() {
  // You can access the game's config to read the width & height
  const { width, height } = this.sys.game.config;

  // Creating a repeating background sprite
  const bg = this.add.tileSprite(0, 0, width, height, "repeating-background");
  bg.setOrigin(0, 0);

  // In v3, you can chain many methods, so you can create text and configure it in one "line"
  this.add
    .text(width / 2, height / 2, "hello\nphaser 3\ntemplate", {
      font: "175px monospace",
      color: "white"
    })
    .setOrigin(0.5, 0.5)
    .setShadow(5, 5, "#5588EE", 0, true, true);
}

function update(time, delta) {
  // We aren't using this in the current example, but here is where you can run logic that you need
  // to check over time, e.g. updating a player sprite's position based on keyboard input
}
