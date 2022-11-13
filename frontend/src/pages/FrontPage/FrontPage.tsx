import { FrontPage as Type } from './FrontPage.type'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  Modal,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Add, Bookmarks, ExpandMore, FileCopy, Help } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const FrontPage: Type = ({ state }) => {
  const { lang } = state

  const userObservatory = 'userObservatory'

  return (
    <front-page-x>
      <Paper>
        <h2>
          {lang.addObservations} - {userObservatory.replace('_', ' ')}
        </h2>
        <Tooltip title={lang.drafts}>
          <IconButton onClick={() => void 0}>
            <Bookmarks />
          </IconButton>
        </Tooltip>
        <Tooltip title={lang.copy}>
          <IconButton onClick={() => void 0}>
            <FileCopy />
          </IconButton>
        </Tooltip>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={1}
            label="Basic example"
            onChange={(newValue) => void 0}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          required
          fullWidth={true}
          id="observers"
          label={lang.observers}
          onChange={(event) => void 0}
          value={'observers'}
        />
        <Button
          id="toDayDetails"
          onClick={() => void 0}
          disabled={false}
          color="primary"
          variant="contained"
        >
          {lang.toDayDetails}
        </Button>
        <Help
        /* title={lang.helpForToDayDetailsButton} */
        /* placement="right" */
        />
        {
          /* toDayDetailsLoadingIcon */ true && (
            <CircularProgress color="primary" />
          )
        }
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="comment-content"
            id="comment-header"
          >
            <Typography>{lang.comment}</Typography>
            <Typography>
              {
                /*eslint-disable-next-line no-constant-condition*/
                /* comment */ true ? lang.commentAdded : lang.noComment
              }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              rows={3}
              multiline={true}
              id="comment"
              fullWidth={true}
              label={lang.comment}
              onChange={(event) => void 0}
              value={'comment'}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="activity-content"
            id="activity-header"
          >
            <Typography>{lang.ObservationActivity}</Typography>

            <Typography
            /* color={
                          errorsInInpulang.dailyactions ? 'error' : 'inherit'
                        } */
            >
              {/* errorsInInpulang.dailyactions
                          ? lang.errorsInObservationActivity
                          : dailyActions.attachments > '0' ||
                            Object.values(dailyActions).includes(true)
                          ? lang.observationActivityAdded
                          : lang.noObservationActivity */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="flex-start" spacing={1}>
              {/* <DailyActions /> */}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="catches-content"
            id="catches-header"
          >
            <Typography>{lang.catches}</Typography>
            <Typography
              color={
                // eslint-disable-next-line no-constant-condition
                /* errorsInInpulang.catches */ true ? 'error' : 'inherit'
              }
            >
              {/* errorsInInpulang.catches
                          ? lang.errorsInCatches
                          : catchRows.length === 0 ||
                            catchRows[0].pyydys === '' ||
                            catchRows[0].pyyntialue === ''
                          ? lang.noCatches
                          : lang.catchesAdded */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="flex-start" spacing={1}>
              {/* <Notification category="catches" /> */}

              {/* catchRows.map((cr, i) =>
                          i % 2 === 0 ? (
                            <Grid key={i} id={i} item xs={12}>
                              <CatchType key={cr.key} cr={cr} />
                            </Grid>
                          ) : (
                            <Grid
                              key={i}
                              id={i}
                              item
                              xs={12}
                              className={classes.catchRowEven}
                            >
                              <CatchType key={cr.key} cr={cr} />
                            </Grid>
                          )
                        ) */}

              <Grid item xs={12}>
                <IconButton
                  id="plus-catch-row-button"
                  size="small"
                  onClick={() => void 0}
                >
                  <Add />
                </IconButton>
                &nbsp;{' '}
                {/* catchRows.length === 0 ? lang.addRowByClicking : '' */}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore color="primary" />}
            aria-controls="obervation-content"
            id="observation-header"
          >
            <Typography>{lang.migrantObservations} *</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="flex-start" spacing={1}>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="Tyyppi">{lang.type}</InputLabel>
                  <Select
                    required
                    labelId="type"
                    fullWidth={true}
                    id="selectType"
                    value={'type'}
                    onChange={(event) => void 0}
                  >
                    {/* types.map((type, i) => (
                                <MenuItem id={type} value={type} key={i}>
                                  {type}
                                </MenuItem>
                              )) */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="Location">{lang.location}</InputLabel>
                  <Select
                    required
                    labelId="location"
                    id="selectLocation"
                    value={location}
                    onChange={(event) => void 0}
                  >
                    {/* locations.map((location, i) => (
                                <MenuItem
                                  id={location}
                                  value={location}
                                  key={i}
                                >
                                  {location}
                                </MenuItem>
                              )) */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}></Grid>

              <Grid item xs={12}>
                {/* <CodeMirrorBlock
                            shorthand={shorthand}
                            setShorthand={setShorthand}
                            setSanitizedShorthand={setSanitizedShorthand}
                            date={day}
                            type={type}
                          /> */}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Grid item xs={12}>
          <Button
            id="saveButton"
            onClick={() => void 0}
            disabled={false /* saveButtonDisabled() || saveDisabled */}
            color="primary"
            variant="contained"
          >
            {/* saveDisabled ? lang.loading : lang.saveMigrant */}
          </Button>
          {/* <Help
                    title={lang.helpForSaveMigrantButton}
                    placement="right"
                  /> */}
          {/* saveLoadingIcon */ true && <CircularProgress color="primary" />}
        </Grid>
      </Paper>

      {/* Side panel */}
      <Grid item xs={3}>
        <Grid item xs={12}>
          <Paper>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                {lang.latestDays}
              </Typography>
              <br />
              <Table>
                <TableBody>
                  {/* latestDays.map((s, i) => (
                        <TableRow
                          id="latestDaysRow"
                          key={i}
                          hover
                          onClick={() => handleDateClick(s)}
                          className={classes.pointerCursor}
                        >
                          <StyledTableCell component="th" scope="row">
                            <Link
                              style={{ color: 'black' }}
                              to={`/daydetails/${s.day}`}
                            >
                              {s.day}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <Link
                              style={{ color: 'black' }}
                              to={`/daydetails/${s.day}`}
                            >
                              {s.speciesCount} {lang.multipleSpecies}
                            </Link>
                          </StyledTableCell>
                        </TableRow>
                      )) */}
                </TableBody>
              </Table>
            </Grid>
            <br />
            <br />
            <Grid item xs={12} mt={0}>
              <Typography variant="h5" component="h2">
                {lang.links}
                <br />
                <br />
              </Typography>
              <Link>
                <Typography variant="subtitle1">{lang.showDaysPage}</Typography>
              </Link>
              <Link>
                <Typography variant="subtitle1">{lang.manualTitle}</Typography>
              </Link>
            </Grid>
          </Paper>
          {/* <Notification category="shorthand" /> */}
          {/* <Notification category="nocturnalMigration" /> */}
        </Grid>
      </Grid>
      <Snackbar
        open={false /* formSent */}
        autoHideDuration={5000}
        onClose={() => void 0}
      >
        <Alert onClose={() => void 0} severity="success">
          {lang.formSent}
        </Alert>
      </Snackbar>
      <Snackbar
        open={false /* errorHappened */}
        autoHideDuration={5000}
        onClose={() => void 0}
      >
        <Alert onClose={() => void 0} severity="error">
          {lang.formNotSent}
        </Alert>
      </Snackbar>
      <Modal
        open={false /* openCopy */}
        onClose={() => void 0 /* handleCopyClose */}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Dialog
          open={false /* openCopy */}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{lang.copy}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {lang.chooseCopy} <br />
              {lang.overwrite}
            </DialogContentText>
            <FormControlLabel
              control={
                <Checkbox
                  id="copy-observers-box"
                  checked={false /* toCopy.observers */}
                  onChange={
                    (event) => void 0 /* handleCopyChange(event.target.name) */
                  }
                  name="observers"
                  color="primary"
                />
              }
              label={lang.observers}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="copy-comment-box"
                  checked={false /* toCopy.comment */}
                  onChange={
                    (event) => void 0 /* handleCopyChange(event.target.name) */
                  }
                  name="comment"
                  color="primary"
                />
              }
              label={lang.comment}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="copy-activity-box"
                  checked={false /* toCopy.observationActivity */}
                  onChange={
                    (event) => void 0 /* handleCopyChange(event.target.name) */
                  }
                  name="observationActivity"
                  color="primary"
                />
              }
              label={lang.ObservationActivity}
              labelPlacement="end"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  id="copy-catches-box"
                  checked={false /* toCopy.catches */}
                  onChange={
                    (event) => void 0 /* handleCopyChange(event.target.name) */
                  }
                  name="catches"
                  color="primary"
                />
              }
              label={lang.catches}
              labelPlacement="end"
            />
          </DialogContent>
          <DialogActions>
            <Button
              id="confirm-copy-button"
              onClick={() => void 0 /* handleCopyConfirm */}
              color="primary"
              variant="contained"
            >
              {lang.confirm}
            </Button>
            <Button
              id="cancel-copy-button"
              onClick={() => void 0 /* handleCopyClose */}
              color="secondary"
              variant="contained"
              autoFocus
            >
              {lang.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
      <Modal
        open={false /* draftsOpen */}
        onClose={() => void 0 /* setDraftsOpen(false) */}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Dialog
          open={false /* draftsOpen */}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{lang.drafts}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ whiteSpace: 'pre-line' }}
            >
              {lang.draftInfoText} <br />
              {lang.overwrite}
            </DialogContentText>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{lang.date}</TableCell>
                  <TableCell>{lang.migrantObservations}</TableCell>
                  <TableCell>{lang.edit}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* drafts?.map((e) => (
                    <TableRow key={e.id} hover>
                      <TableCell>
                        {e.id === draftID && '>'} {e.day} {e.type} {e.location}
                      </TableCell>
                      <TableCell>{e.shorthand}</TableCell>
                      <TableCell>
                        <Button
                          id="confirm-draft-button"
                          onClick={() => handleDraftConfirm(e.id)}
                          color="primary"
                          variant="contained"
                        >
                          {lang.edit}
                        </Button>
                        <Button
                          id="delete-draft-button"
                          onClick={() => deleteDraft(e.id)}
                          variant="contained"
                        >
                          {lang.remove}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) */}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button
              id="delete-all-button"
              onClick={() => {
                //confirm(`${lang.remove} ${lang.all} ?!?`.toUpperCase()) &&
                //clearAll(user.id)
              }}
              color="secondary"
              variant="contained"
              autoFocus
            >
              {lang.remove} {lang.all}
            </Button>
            <Button
              id="cancel-copy-button"
              onClick={() => void 0 /* setDraftsOpen(false) */}
              color="secondary"
              variant="contained"
              autoFocus
            >
              {lang.cancel}
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
    </front-page-x>
  )
}
