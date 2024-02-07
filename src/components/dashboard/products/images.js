const ProductImages = ({ rawImages, setRawImages }) => {
  return (
    <div className="p-0 mb-3">
      {rawImages.map((img, index) => (
        <div key={index} className="d-flex flex-row mt-3 mb-1">
          <div className="col-12">
            <div className="form-floating">
              <input
                type="file"
                required
                className="form-control rounded-0"
                id={`image-${index}`}
                placeholder="Image"
                onChange={(e) => {
                  const updatedImgs = [...rawImages];
                  updatedImgs[index] = e.target.files[0];
                  setRawImages(updatedImgs);
                }}
              />
              <label htmlFor={`image-${index}`}>Other Images</label>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setRawImages([...rawImages, {}])}
        className="text-start text-primary transparent border-0"
      >
        + add {rawImages.length > 0 && "more image"}
      </button>
    </div>
  );
};

export default ProductImages;
