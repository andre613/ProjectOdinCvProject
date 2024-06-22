import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { FaRegSave, FaUndo } from 'react-icons/fa';
import { RiStickyNoteAddFill } from 'react-icons/ri';

interface PracticalExperienceData {
  companyName: string;
  positionTitle: string;
  mainResponsibilities: string;
  startDate: Date;
  endDate: Date | null;
}

interface PracticalExperienceProps {
  isForAdding?: boolean;
  data?: PracticalExperienceData | null;
  index?: number | null;
  savePracticalExperience: (data: PracticalExperienceData, index: number | null) => void;
  cancelAdding?: () => void;
  deletePracticalExperience?: (index: number) => void;
}

const PracticalExperience: React.FC<PracticalExperienceProps> = ({
  isForAdding = false,
  data = null,
  index = null,
  savePracticalExperience,
  cancelAdding,
  deletePracticalExperience
}) => {

  const [isEditing, setIsEditing] = useState<boolean>(data === null);
  const [newCompanyName, setNewCompanyName] = useState<string>(data? data.companyName : '');
  const [newPositionTitle, setNewPositionTitle] = useState<string>(data? data.positionTitle : '');
  const [newStartDate, setNewStartDate] = useState<Date>(data? data.startDate : new Date());
  const [newEndDate, setNewEndDate] = useState<Date | null>(data? data.endDate : null);
  const [newMainResponsibilities, setNewMainResponsibilities] = useState<string>(data? data.mainResponsibilities : '');
  const [isPresentJob, setIsPresentJob] = useState<boolean>(data? data.endDate === null : true);

  const handleNewCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCompanyName(e.target.value);
  };

  const handleNewPositionTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPositionTitle(e.target.value);
  };

  const handlePresentJobChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    setIsPresentJob(isChecked);
    setNewEndDate(isChecked? null: new Date());
  };

  const handleNewMainResponsibilitiesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewMainResponsibilities(e.target.value);
  };

  const handleSaveButtonClick = (): void => {
    savePracticalExperience({
        companyName: newCompanyName,
        positionTitle: newPositionTitle,
        startDate: newStartDate,
        endDate: newEndDate,
        mainResponsibilities: newMainResponsibilities,
      }, 
      index);

    if(isForAdding) {
      cancelAdding!();
    }

    setIsEditing(false);
  };

  const handleCancelButtonClick = (): void => {
    if(isForAdding) {
      cancelAdding!();
      setIsEditing(true);
    }
    else {
      setIsEditing(false);
    }
  };

  const handleDeleteButtonClick = (): void => {
    setIsEditing(false);
    deletePracticalExperience!(index as number);
  }

  const saveEnabled = newCompanyName && newPositionTitle && newStartDate;

  return (
  <>
    {!isEditing && !isForAdding &&
      <>
        `<Row>`
          <Col>
            <h4>{newCompanyName}</h4>
          </Col>

          <Col style={{textAlign: 'right'}}>
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="editButtonToolTip">Edit Educational Experience</Tooltip>
								}
							>
								<Button variant="primary" className="btn-sm" onClick={() => setIsEditing(true)}><BsPencil /></Button>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="deleteButtonToolTip">Delete Educational Experience</Tooltip>
								}
							>
								<Button variant="secondary" className="btn-sm" onClick={handleDeleteButtonClick}>
									<BsTrash />
								</Button>
							</OverlayTrigger>
						</Col>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
          <Col>
            <h5>{newPositionTitle}</h5>
          </Col>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
          <Col>
            Start Date: {moment(newStartDate).format('YYYY/MM/DD')}
          </Col>
          
          <Col>
            {isPresentJob? 'Present Job' : `End Date: ${moment(newEndDate).format('YYYY/MM/DD')}`}
          </Col>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
          <Col>
            Main Responsibilities:
            <br />
            {newMainResponsibilities}
          </Col>
        </Row>
      </>
    }

    { isEditing && 
      <>
        <Row style={{paddingBottom: '1em'}}>
          <Form.Group as={Col} controlId="companyName">
            <Form.Label>Company Name</Form.Label>

            <Form.Control
              type="text"
              value={newCompanyName}
              placeholder="Enter Company Name"
              onChange={handleNewCompanyNameChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="positionTitle">
            <Form.Label>Position Title</Form.Label>

            <Form.Control
              type="text"
              value={newPositionTitle}
              placeholder="Enter Position Title"
              onChange={handleNewPositionTitleChange}
            />
          </Form.Group>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
          <Form.Group as={Col} controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            
            <br />

            <DatePicker
              value={moment(newStartDate).format('YYYY/MM/DD')}
              showIcon
              toggleCalendarOnIconClick
              dateFormat="yyyy/MM/dd"
              showYearDropdown
              selected={newStartDate}
              onChange={(date) => {setNewStartDate(date!)}}
              id="startDate"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="endDate">
            <Form.Label>End Date</Form.Label>
            
            <br />
            { !isPresentJob &&
              <DatePicker
                value={moment(newEndDate).format('YYYY/MM/DD')}
                showIcon
                toggleCalendarOnIconClick
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                selected={newEndDate}
                onChange={(date) => {setNewEndDate(date!)}}
              />
            }
            <Form.Check type="checkbox" checked={isPresentJob} label="Present Job" onChange={handlePresentJobChanged} />
          </Form.Group>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
          <Form.Group as={Col} controlId="mainResponsibilities">
            <Form.Label>Main Responsibilities</Form.Label>

            <Form.Control as="textarea" rows={3} onChange={handleNewMainResponsibilitiesChange}/>
          </Form.Group>
        </Row>

        <Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="savePracticalExperience">
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="saveButtonToolTip">
										Save Practical Experience
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" onClick={handleSaveButtonClick} disabled={!saveEnabled}>
										<FaRegSave />
									</Button>
								</span>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="undoButtonToolTip">
										Undo your changes
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" variant="secondary" onClick={handleCancelButtonClick}>
										<FaUndo />
									</Button>
								</span>
							</OverlayTrigger>
						</Form.Group>
					</Row>
      </>
    }
  
  </>);
};

const PracticalExperienceList: React.FC = () => {
  const [practicalExperienceItems, setPracticalExperienceItems] = useState<PracticalExperienceData[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  
  const handleAddPracticalExperienceClick = () => { 
    setIsAdding(true); 
  };

  const savePracticalExperience = (data: PracticalExperienceData, index: number | null = null): void => {
    let newPracticalExperienceItems: PracticalExperienceData [] = [];

    if (index === null) {
      newPracticalExperienceItems = [...practicalExperienceItems, data];
    }
    else {
      newPracticalExperienceItems = [...practicalExperienceItems];
      newPracticalExperienceItems[index] = data;
    }

    setPracticalExperienceItems(newPracticalExperienceItems);
    localStorage.setItem('practicalExperiences', JSON.stringify(newPracticalExperienceItems));
  };

  const deletePracticalExperience = (index: number): void => {
    const newPracticalExperienceItems = [...practicalExperienceItems];
    newPracticalExperienceItems.splice(index, 1);
    setPracticalExperienceItems(newPracticalExperienceItems);
    localStorage.setItem('practicalExperiences', JSON.stringify(newPracticalExperienceItems));
  };

  useEffect(() => {
    const serializedPracticalExperienceItems = localStorage.getItem('practicalExperiences');

    if(serializedPracticalExperienceItems) {
      setPracticalExperienceItems(JSON.parse(serializedPracticalExperienceItems));
    }
  }, []);

  return (
  <>
    <Row style={{paddingBottom: '1em'}}>
      <Col>
        <h3>Practical Experience</h3>
      </Col>

      <Col style={{textAlign: 'right'}}>
					<OverlayTrigger
						placement="top"
						overlay={
							<Tooltip id="addPracticalExperienceToolTip">Add Practical Experience</Tooltip>
						}
					>
						<Button variant="primary" className="btn-sm" onClick={handleAddPracticalExperienceClick}>
							<RiStickyNoteAddFill />
						</Button>
					</OverlayTrigger>
				</Col>
    </Row>

    {isAdding &&
      <PracticalExperience 
        key="addPracticalExperience"
        isForAdding
        savePracticalExperience={savePracticalExperience} 
        cancelAdding={() => setIsAdding(false)}
      />
    }

    {
      practicalExperienceItems.length? practicalExperienceItems.map(
        (pe: PracticalExperienceData, index: number) => (
          <PracticalExperience
            key={Math.random().toString()}
            data={pe}
            index={index}
            savePracticalExperience={savePracticalExperience}
            deletePracticalExperience={deletePracticalExperience}
          />)):

        <Row>
          <Col>
            <p>No Practical Experience On File.</p>
          </Col>
        </Row>
    }
  </>);
};

export default PracticalExperienceList;