const Recover = () => {
    const [showError, setShowError] = useState('');
  	const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true);
        axios({
            method: 'get',
            headers: {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            url: process.env.REACT_APP_BACKEND_URI+'/users/recoverPassword',
            data:{
                email: data.get('email'),
            }}).then( (req, res) => {
                setShowError(err.response.data.reason);
                setLoading(false);
            })
            .catch((err) => {
                setShowError(err.response.data.reason);
                setLoading(false);
                console.log(err);
            });
    }
    
    
    return ( 



    );
}
 
export default Recover;