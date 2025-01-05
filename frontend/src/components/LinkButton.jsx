import {Link} from "react-router-dom";

const LinkButton = ({children, to, className}) => {
    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    );
};

export default LinkButton;