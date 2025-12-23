using System.ComponentModel;

namespace Foodfolio.Helpers
{
    public class ColorPicker : INotifyPropertyChanged
    {
        private string _selectedColor = "#FF0000";

        public string SelectedColor
        {
            get => _selectedColor;
            set
            {
                if (_selectedColor == value)
                    return;

                _selectedColor = value;
                OnPropertyChanged(nameof(SelectedColor));
            }
        }

        public event PropertyChangedEventHandler? PropertyChanged;

        private void OnPropertyChanged(string propertyName)
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
