"use client";

import { Trash } from "iconsax-react";

const ProductSpecification = ({ specifications, setSpecifications }) => {
  return (
    <div className="p-0 my-3">
      <div>Specifications</div>

      {specifications.map((spec, index) => (
        <div key={index} className="d-flex flex-row mb-2">
          <div className="col-10">
            <div className="row">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id={`specName-${index}`}
                    value={spec.name}
                    required
                    placeholder="Spec name"
                    onChange={(e) => {
                      const updatedSpecs = [...specifications];
                      updatedSpecs[index].name = e.target.value.toLowerCase();
                      setSpecifications(updatedSpecs);
                    }}
                  />
                  <label htmlFor={`specName-${index}`}>Spec name</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id={`specValue-${index}`}
                    value={spec.value}
                    required
                    placeholder="Value"
                    onChange={(e) => {
                      const updatedSpecs = [...specifications];
                      updatedSpecs[index].value = e.target.value.toLowerCase();
                      setSpecifications(updatedSpecs);
                    }}
                  />
                  <label htmlFor={`specValue-${index}`}>Value</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-2 d-flex justify-content-center">
            <button
              type="button"
              className="d-flex align-items-center btn"
              onClick={() => {
                const updatedSpecs = [...specifications];
                updatedSpecs.splice(index, 1);
                setSpecifications(updatedSpecs);
              }}
            >
              <Trash className="text-danger" />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          setSpecifications([...specifications, { name: "", value: "" }]);
        }}
        className="text-start text-primary transparent border-0"
      >
        + add {specifications.length > 0 && "more "}specification
      </button>
    </div>
  );
};

export default ProductSpecification;
