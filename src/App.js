import React, {useState, useEffect} from 'react';
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/imageSearch";

function App() {
    const [images,  setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => {
                setImages(data.hits);
                setIsLoading(false);
            })
            .catch(err => console.err(err));
    }, [term]);

    /*
    Lastly, we added a few classes to our spans which include inline-block. What this does is sets the display of
    the span which means the element is treated like other inline elements but allows the use of block properties.
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Software Engineer</span>
    */
    return (
        <>

            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={require('./profile.jpg')} alt="Display" />
                <div className="px-6 py-4">
                    <div className="font-bold text-purple-500 text-xl mb-2">
                        Blessing Krofegha
                    </div>
                    <p className="text-gray-700 text-base">
                        When i’m not coding i switch to netflix with biscuits and cold tea as my companion. <span></span>😜
                    </p>
                </div>
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Software Engineer</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Writter</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Public Speaker</span>
                </div>
            </div>

            <div className="container mx-auto">
                <ImageSearch searchText={text => setTerm(text)}/>

                {/* e.g. when  you search feawfewafew */}
                {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>}

                {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading</h1> :
                    <div className="grid grid-cols-3 gap-4">
                        {images.map(image => <ImageCard key={image.id} image={image}/>)}
                    </div>
                }
            </div>
        </>
    );
}

export default App;
