import React, { useEffect } from "react";

function FontLoader() {
  useEffect(() => {
    // Replace 'YOUR-ADOBE-FONTS-KIT-ID' with your Adobe Fonts kit ID
    const kitId = "YOUR-ADOBE-FONTS-KIT-ID";

    // Create a script element for the Adobe Fonts JavaScript embed code
    const script = document.createElement("script");
    script.src = `https://use.typekit.net/${kitId}.js`;
    script.async = true;

    // Attach an event listener to the script to load fonts once it's ready
    script.onload = () => {
      // Initialize Adobe Fonts when the script has loaded
      window.Typekit.load({
        async: true,
        active: () => {
          // Fonts are loaded and active
          console.log("Adobe Fonts loaded.");
        },
      });
    };

    // Append the script element to the document's head
    document.head.appendChild(script);

    // Clean up by removing the script element when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
}

export default FontLoader;
