import { ChangeEvent, useState } from "react";
import { CustomButton, CustomForm, CustomToast } from "components";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cleanForm } from "utils/formCleaner";
import { NomineeHelper } from "helpers/nomineeHelper";
import { useNominee } from "context/nominee";
import "./styles.scss";

export const NewNominee: React.FC = () => {
  const navigate = useNavigate();
  const {nominees, setNominees}= useNominee();
  const nomineeHelper = new NomineeHelper(nominees, setNominees);

  const [isToastShown, setIsToastShown] = useState(false);
  const [addedNominee, setAddedNominee] = useState("");
  const [newNominee, setNewNominee] = useState({
    tournamentName: "",
    tournamentWinner: "",
    imageSource: "",
  });

  const onFormInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: keyof typeof newNominee
  ) => {
    setNewNominee((prevState) => ({
      ...prevState,
      [inputType]: event.target.value,
    }));
  };

  const createNewNominee = () => {
    nomineeHelper.create(newNominee);
    setAddedNominee(newNominee.tournamentName);
    setNewNominee((prevState) => cleanForm(prevState));
    setIsToastShown(true);
  };

  return (
    <>
      <Stack gap={5} className="new-nominee-container">
        <CustomButton
          variant="light"
          className="new-nominee-button"
          iconProps={{ name: "bi-chevron-left" }}
          text="GO BACK"
          onClick={() => navigate(-1)}
        />
        <CustomForm
          title="ADD NEW NOMINEE"
          onSubmit={createNewNominee}
          items={[
            {
              key: "tournament_name",
              label: "Tournament Name",
              value: newNominee.tournamentName,
              onChange: (event) => onFormInputChange(event, "tournamentName"),
              errormessage: "Tournament Name is required",
              required: true
            },
            {
              key: "tournament_winner_team",
              label: "Tournament Winner Team",
              value: newNominee.tournamentWinner,
              onChange: (event) => onFormInputChange(event, "tournamentWinner"),
              errormessage: "Tournament Winner Team is required",
              required: true,
            },
            {
              key: "cover_image_url",
              label: "Cover Image URL",
              value: newNominee.imageSource,
              onChange: (event) => onFormInputChange(event, "imageSource"),
              errormessage: "Cover Image URL is required",
              required: true,
            },
          ]}
        />
      </Stack>
      <CustomToast
        onClose={() => setIsToastShown(false)}
        show={isToastShown}
        text={
          <>
            <b>{addedNominee}</b> added to nominees!
          </>
        }
        autohide
      />
    </>
  );
};
