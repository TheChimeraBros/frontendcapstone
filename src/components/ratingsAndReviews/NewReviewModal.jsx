import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/index.js';
import StarRatings from 'react-star-ratings';
import api from '../../apis/reviews.js';
import FormCharacteristics from './FormCharacteristics.jsx';

export default function NewReviewModal({ onClose }) {
  const dispatch = useDispatch();
  let productId = useSelector(state=>state.productId);

  const [rating, setRating] = useState(0);
  const [characteristics, setCharacteristics] = useState([]);
  const [size, setSize] = useState(null);
  const [width, setWidth] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [quality, setQuality] = useState(null);
  const [length, setLength] = useState(null);
  const [fit, setFit] = useState(null);

  const handleRateCharacter = (character, score) => {
    switch (character) {
      case 'size':
        setSize(score);
        break;
      case 'width':
        setWidth(score);
        break;
      case 'comfort':
        setComfort(score);
        break;
      case 'quality':
        setQuality(score);
        break;
      case 'length':
        setLength(score);
        break;
      case 'fit':
        setFit(score);
        break;
    }
  };

  useEffect(() => {
    async function fetchMeta() {
      try {
        let metaParams = {
          product_id: productId
        }
        let metaResult = await api.getMetaData(metaParams);
        setCharacteristics(Object.keys(metaResult.characteristics));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeta();
  }, []);

  return ReactDom.createPortal(
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto min-w-[60vw] max-w-[90vw]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Write Your Review</h3>
              <button
                className="p-1 ml-4 bg-transparent border-0 text-black opacity-25 float-right text-3xl leading-none font-semibold outline-none focus:outline-none align-center"
                onClick={() => dispatch(closeModal())}>
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">x</span>
              </button>
            </div>
            {/*body*/}
            {/* <h2 className="px-6 py-2 text-xl">for product {productId}</h2> */}
            <div className="relative p-6 flex justify-between space-x-12 divide-x divide-solid">
              <div className="w-2/4 pl-12">
                <div className="flex flex-col justify-between mb-2">
                  <label className="underline">Overall Rating:</label>
                  <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={setRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="24px"
                    starSpacing="5px"
                    starRatedColor="green"
                    starEmptyColor="lightgray"
                    starHoverColor="green"
                  />
                  {rating > 0 ? <div>{rating} stars</div> : ''}
                </div>
                <div className="mb-2">
                  <div className="underline">Do You Recommend?</div>
                  <input
                    className="ml-6 mr-2"
                    type='radio'
                    name='recommend'
                    value='yes'
                    id='rec_yes'
                  />
                  <label htmlFor='rec_yes'>Yes</label>
                  <input
                    className="ml-6 mr-2"
                    type='radio'
                    name='recommend'
                    value='no'
                    id='rec_no'
                  />
                  <label htmlFor='rec_no'>No</label>
                </div>
                <div>
                  <label>Summary</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2"
                    type='text'
                    placeholder="Example: Best purchase ever!"
                  />
                </div>
                <div>
                  <label>Body</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2"
                    type='text'
                    placeholder="Why did you like the product or not?"
                  />
                </div>
                <div>
                  <label>Photos</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2"
                    type='text'
                    placeholder="review text"
                  />
                </div>
                <div>
                  <label>Nickname</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2"
                    type='text'
                    placeholder="review text"
                  />
                </div>
                <div>
                  <label>email</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2"
                    type='text'
                    placeholder="review text"
                  />
                </div>
              </div>
              <div className="w-2/4 px-12">
                <div className="mb-2 divide-y divide-dashed">
                  {characteristics.map((each) => { return <FormCharacteristics characteristic={each} handleRateCharacter={handleRateCharacter} />})}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(closeModal())}
              >Submit</button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(closeModal())}
              >Discard</button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>, document.getElementById('portal')
  )
}