import { useCallback, useEffect, useState } from "react";
import { Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomPagination,
  CustomDropdown,
  CustomModal,
  NomineeCard,
  CustomToast,
} from "components";
import { CustomDropdownItemProps } from "components/CustomDropdown/types";
import { NomineeAPIService as nomineeService } from "api/services/nominee.service";
import { NomineeModel } from "models/Nominee";
import { VoteType } from "helpers/typeHelper";
import {
  ASCENDING_FILTER,
  DESCENDING_FILTER,
  INITIAL_FILTER,
} from "helpers/enumHelper";
import "./styles.scss";

export const Nominees: React.FC = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>(INITIAL_FILTER);
  const [isRemoveModalShown, setIsRemoveModalShown] = useState<boolean>(false);
  const [isToastShown, setIsToastShown] = useState<boolean>(false);
  const [fetchNomineesCounter, setFetchNomineesCounter] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [removableNominee, setRemovableNominee] = useState<NomineeModel>();
  const [removedNominee, setRemovedNominee] = useState<NomineeModel>();
  const [nominees, setNominees] = useState<NomineeModel[]>([]);

  const handleShowAddNomineeModal = () => {
    setIsRemoveModalShown((prevState) => !prevState);
  };

  const onRemoveNomine = () => {
    setIsRemoveModalShown(false);
    setRemovedNominee(removableNominee);

    nomineeService.delete(removableNominee?.id as number).finally(() => {
      setIsToastShown(true);

      // check for last nominee for last page
      if (nominees.length === 1 && currentPage > 1) {
        return setCurrentPage((prevPage) => prevPage - 1);
      } else {
        setFetchNomineesCounter((prevCounter) => prevCounter + 1);
      }
    });
  };

  const onVoteNominee = useCallback(
    (votedNominee: NomineeModel, type: VoteType) => {
      let currentVotePoints = votedNominee.points;

      if (type === "downvote") {
        currentVotePoints--;
      }

      if (type === "upvote") {
        currentVotePoints++;
      }

      nomineeService
        .updatePoints(votedNominee.id, currentVotePoints)
        .finally(() => {
          setFetchNomineesCounter((prevCounter) => prevCounter + 1);
        });
    },
    []
  );

  const dropdownItems: CustomDropdownItemProps[] = [
    {
      text: "MOST POINTS",
      onClick: () => {
        setFilter(DESCENDING_FILTER);
        setCurrentPage(1);
      },
      key: "filter_most_points",
    },
    {
      text: "LESS POINTS",
      onClick: () => {
        setFilter(ASCENDING_FILTER);
        setCurrentPage(1);
      },
      key: "filter_less_points",
    },
  ];

  useEffect(() => {
    nomineeService.get(currentPage, filter).then((response) => {
      setTotalPages(response.totalPage);
      setNominees(response.data);
    });
  }, [currentPage, filter, fetchNomineesCounter]);

  return (
    <>
      <Stack gap={5}>
        {/* Manager Button Group */}
        <Row className="manager-buttons-wrapper">
          <CustomButton
            className="manager-button"
            iconProps={{ name: "bi-plus-lg" }}
            text="ADD NOMINEE"
            onClick={() => navigate("/nominee/new")}
          />
          <CustomDropdown
            title="SORT BY"
            className="manager-button"
            variant="secondary"
            iconProps={{ name: "bi-filter" }}
            items={dropdownItems}
          />
        </Row>

        {/* Page Title */}
        <h3 className="nominees-page-title">
          <b>VOTE</b> FOR <b>THE BEST TOURNAMENT</b> STREAMED!
        </h3>

        {/* Nominee Cards */}
        {!!nominees.length ? (
          <Container className="cards-wrapper">
            {nominees.map((nominee) => (
              <NomineeCard
                {...nominee}
                key={nominee.id}
                onDelete={() => {
                  handleShowAddNomineeModal();
                  setRemovableNominee(nominee);
                }}
                onDownvote={() => onVoteNominee(nominee, "downvote")}
                onUpvote={() => onVoteNominee(nominee, "upvote")}
              />
            ))}
          </Container>
        ) : (
          <h5 className="nominees-page-title">
            There is no nominees to display!
          </h5>
        )}

        {/* Pagination */}
        {!!nominees.length && (
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesCount={totalPages}
          />
        )}
      </Stack>
      <CustomModal
        confirmation
        isShown={isRemoveModalShown}
        onHide={handleShowAddNomineeModal}
        onConfirm={onRemoveNomine}
        title={"Remove Nominee"}
        description={
          <>
            Do you want to remove <b>{removableNominee?.tournamentName}</b> from
            nominees?
          </>
        }
      />
      <CustomToast
        autohide
        onClose={() => setIsToastShown(false)}
        show={isToastShown}
        text={
          <>
            <b>{removedNominee?.tournamentName}</b> removed from nominees!
          </>
        }
      />
    </>
  );
};
