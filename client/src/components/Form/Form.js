import React from "react";

const Form = props => (
  <form>
    <div className="form-group">
      <label htmlFor="Query">
        <strong>Ingredients</strong>
      </label>
      <input
        className="form-control"
        id="Title"
        type="text"
        value={props.q}
        placeholder="Chicken"
        name="q"
        onChange={props.handleInputChange}
        required
      />
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-success float-right"
      >
        Search
      </button>
    </div>
  </form>
);

export default Form;
