import {useState} from "react";

export const ContactUs = () => {
    const [image, setImage] = useState('https://via.placeholder.com/100')
    return (
        <div className='container pt-5'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Contact Us</h3>
                </div>
                <div className='card-body'>
                    <form>
                        <input type='text' className='form-control mb-2' name='title' placeholder='Title' minLength='10' required/>
                        <textarea name='content' className='form-control mb-2' placeholder='Content' minLength='100' required></textarea>
                        <img src={image} style={{width: "150px", height: "auto"}} alt='' className='mb-2'/>
                        <input type='text' className='form-control mb-2' name='title' placeholder='Link Image' minLength='10' required/>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck"/>
                            <label className="form-check-label" htmlFor="inlineFormCheck">
                                Post Now
                            </label>
                        </div>
                        <button type='submit' className='btn btn-primary w-100'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
