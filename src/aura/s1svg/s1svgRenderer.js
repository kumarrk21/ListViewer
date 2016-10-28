({
  render: function(component, helper) {
    //grab attributes from the component markup
    var classname = component.get("v.class");
    var xlinkhref = component.get("v.xlinkHref");
    var ariaHidden = component.get("v.ariaHidden");
    var id  = component.get("v.ariaHidden");

    //return an svg element w/ the attributes
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', classname);
    svg.setAttribute('aria-hidden', ariaHidden);
    //svg.setAttribute('id',id);
    svg.innerHTML = '<use xlink:href="'+xlinkhref+'"></use>';
    svg.id = id;
    return svg;
  }
})