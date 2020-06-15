import React from "react";
import PropTypes from "prop-types";

function YesNoQuestion(props) {
  const { questionText, helpText, inputName } = props;
  return (
    <li className="yesNoComponent">
      {questionText}
      <p className="helpText">{helpText}</p>
      <form>
        <input name={inputName} type="radio" value="Yes" />
        <input name={inputName} type="radio" value="No" />
      </form>
      <div className="subQuestion">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        cursus neque risus, id efficitur felis tincidunt in. Mauris pretium
        tortor orci, ac pharetra ipsum vulputate quis. Maecenas sit amet libero
        ut elit ornare imperdiet sit amet ac velit. Nunc sit amet lacinia velit,
        a tincidunt nibh. Ut porttitor finibus dolor, non porta dolor ornare
        sed. Aenean nunc dolor, congue quis sodales eu, viverra tristique ipsum.
        Ut nec iaculis ipsum, at bibendum sem.
      </div>
    </li>
  );
}

YesNoQuestion.propTypes = {
  questionText: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default YesNoQuestion;
