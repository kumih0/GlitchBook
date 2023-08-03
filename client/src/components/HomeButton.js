// Importing the 'Link' component from 'react-router-dom' and the 'GlitchBookLogo' image.
import { Link } from "react-router-dom";
import GlitchBookLogo from "./img/GlitchBookLogo.gif"

// The 'HomeButton' component that renders a button with a GlitchBook logo as a link to the home page.
const HomeButton = () => {
    return (
        <Link to={'/'} className={"butonckik-home"}>
            {/* Button element containing the GlitchBook logo image. */}
            <button>
                <img src={GlitchBookLogo} alt={"GlitchBookLogo"}></img>
            </button>
        </Link>
    );
}

// Exporting the 'HomeButton' component as the default export for this module.
export default HomeButton;
