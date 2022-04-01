export default class Navbar extends Component {

    render() {
      return (
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DateTimePicker
    renderInput={(props) => <TextField {...props} />}
    label="DateTimePicker"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>
      );
    }
}