import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

function WeekConfirmationDetails(props) {
	const { questionAnswers, questionKeys, weekString } = props;
	const { t } = useTranslation();

	const employerAddressNames = [
		"employerName",
		"address1",
		"address2",
		"city",
		"state",
		"zipcode",
	];

	const employerQuestionNames = [
		"heading",
		"lastDateWorked",
		"totalHoursWorked",
		"grossEarnings",
		"help-moreDetails",
		"moreDetails",
	];

	const employerQuestionKeys = employerQuestionNames.map(
		(name) => "retrocerts-certification.employers." + name
	);

	function Employers(props) {
		return employerQuestionKeys.map((questionKey, index) => {
			const question = t(questionKey);
			return (
				<React.Fragment key={index}>
					<p>{question}</p>
				</React.Fragment>
			);
		});
	}

	return questionKeys.map((questionKey, index) => {
		const questionNumber = index + 1;
		const answer = questionAnswers[index];
		const showEmployers =
			questionKey.endsWith("workOrEarn") && answer === "Yes";

		return (
			<React.Fragment key={index}>
				<p>
					{questionNumber}.{" "}
					<Trans t={t} i18nKey={questionKey} values={{ weekString }} />
				</p>
				<p>
					<strong>{answer}</strong>
				</p>
				{showEmployers && <Employers />}
			</React.Fragment>
		);
	});
}
WeekConfirmationDetails.propTypes = {
	questionAnswers: PropTypes.array,
	questionKeys: PropTypes.arrayOf(PropTypes.string),
	weekString: PropTypes.string,
};

export default WeekConfirmationDetails;
