const Form = ({children, onSubmit}) => {
    return (
        <form className={"form-container"} onSubmit={onSubmit}>
            {children}
        </form>
    );
};
export default Form;