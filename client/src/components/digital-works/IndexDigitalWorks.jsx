import CreateDigitalWorks from "./CreateDigitalWorks";

const IndexDigitalWorks = (props) => {
    const [digitalWorks, setDigitalWorks] = useState([]);
    const fetchDigitalWorks = async()=>{
        const url = `http://localhost:4000/digital/`
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        }
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setDigitalWorks(data.digitalWorks);
        } catch (error) {
            console.log(error.message);
        }
    };

useEffect(() => {
    if(props.token){
    fetchDigitalWorks();
    }
}, [props.token]);


    return (  
    <>
    <CreateDigitalWorks token={props.token} fetchDigitalWorks={fetchDigitalWorks} />
        {/* <Container>
            <Row>
                <Col  md="4">
                <MovieCreate token={props.token} fetchMovies={fetchMovies}/>
                </Col>
                <Col md="8">
                <MovieTable 
                    movies={movies} 
                    token={props.token} 
                    fetchMovies={fetchMovies}/>
                </Col>
            </Row>
        </Container> */}
    </>
    );
};
 
export default IndexDigitalWorks;