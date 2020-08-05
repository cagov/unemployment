import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import ListOfWeeksWithDetail from "../../components/ListOfWeeksWithDetail";
import programPlan from "../../../data/programPlan";
import AccordionItem from "../../components/AccordionItem";

function ListOfCertifications(props) {
  const { t } = useTranslation();

  const { userData } = props;

  const numAccordions = userData.weeksToCertify.length + 1; // add 1 for Acknowledgement

  const acknowledgementIndex = numAccordions - 1;
  const [showAll, setShowAll] = useState(false);
  const [accordionsExpanded, setAccordionsExpanded] = useState(
    Array(numAccordions).fill(false)
  );
  const isAnyWeekPua = userData.programPlan.includes(programPlan.puaFullTime);

  function toggleAllAccordions() {
    setShowAll(!showAll);
    setAccordionsExpanded(Array(numAccordions).fill(!showAll));
  }

  function toggleAccordion(index) {
    // Need to clone the state variable here, React doesn't allow mutating them
    const newAccordionsExpanded = [...accordionsExpanded];
    newAccordionsExpanded[index] = !newAccordionsExpanded[index];
    setAccordionsExpanded(newAccordionsExpanded);

    // If all the accordions are now either closed or open,
    // update the Show all / Hide all button to match
    if (newAccordionsExpanded.every((x) => x === newAccordionsExpanded[0])) {
      setShowAll(newAccordionsExpanded[index]);
    }
  }

  function AcknowledgementDetail(props) {
    return (
      <React.Fragment>
        {isAnyWeekPua ? (
          <ul>
            <li>{t("retrocerts-certification.ack-list-pua-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-3")}</li>
          </ul>
        ) : (
          <ul>
            <li>{t("retrocerts-certification.ack-list-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-item-3")}</li>
            <li>{t("retrocerts-certification.ack-list-item-4")}</li>
          </ul>
        )}
        <input type="checkbox" checked disabled />
        {t("retrocerts-certification.ack-label")}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Button
        variant="outline-secondary"
        className="text-dark bg-light mb-3"
        onClick={toggleAllAccordions}
      >
        {showAll
          ? t("retrocerts-confirmation.button-hide-all")
          : t("retrocerts-confirmation.button-show-all")}
      </Button>
      <ListOfWeeksWithDetail
        showContentArray={accordionsExpanded}
        toggleContent={toggleAccordion}
        userData={userData}
      />
      <AccordionItem
        header={<strong>{t("retrocerts-certification.ack-header")}</strong>}
        content={<AcknowledgementDetail className="detail" />}
        showContent={accordionsExpanded[acknowledgementIndex]}
        toggleContent={() => toggleAccordion(acknowledgementIndex)}
      />
    </React.Fragment>
  );
}

ListOfCertifications.propTypes = {
  userData: userDataPropType,
};

export default ListOfCertifications;
