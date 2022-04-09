import { CustomButton, CustomCard } from "components";
import { ButtonGroup, Stack } from "react-bootstrap";
import { dateFormat } from "utils/dateFormatter";
import { NomineeCardProps } from "./types";
import "./styles.scss";

export const NomineeCard: React.FC<NomineeCardProps> = ({
  id,
  tournamentName,
  imageSource,
  lastVotedDate,
  tournamentWinner,
  points,
  onDelete,
  onDownvote,
  onUpvote,
}) => {
  return (
    <CustomCard
      className="nominee-card-container"
      key={id}
      title={tournamentName}
      image={imageSource}
      content={
        <>
          <b>Winner:</b> {tournamentWinner} <br />
          {!!lastVotedDate ? (
            <>
              <b>Last Vote Date:</b> {dateFormat(lastVotedDate)}
            </>
          ) : (
            <br />
          )}
        </>
      }
      buttons={
        <Stack className="buttons-wrapper">
          <ButtonGroup className="button-group-container">
            <CustomButton
              className="nominee-card-button"
              text="DOWN"
              variant="warning"
              iconProps={{ name: "bi-chevron-down" }}
              onClick={onDownvote}
              outlined
              cornered
            />
            <CustomButton
              className="nominee-card-button"
              text="UP"
              variant="info"
              iconProps={{ name: "bi-chevron-up" }}
              onClick={onUpvote}
              outlined
              cornered
            />
          </ButtonGroup>
          <CustomButton
            className="delete-button"
            text="DELETE"
            variant="danger"
            onClick={onDelete}
            cornered
          />
        </Stack>
      }
    >
      <div className="score-container">
        <h3 className="point-container">{points}</h3>
        <h6 className="points-text-container">points</h6>
      </div>
    </CustomCard>
  );
};
