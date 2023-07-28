import { Link } from "react-router-dom";
import GlitchBookLogo from "./img/GlitchBookLogo.gif"

const HomeButton = () => {
    return <Link to={'/'} className={"butonckik-home"}>
        <button><img src={GlitchBookLogo} alt={"GlitchBookLogo"}></img></button>
    </Link>
}

export default HomeButton