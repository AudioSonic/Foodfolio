using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Foodfolio.Helpers;
using Foodfolio.MVVM.Views;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.MAUI.MVVM.ViewModels
{
    public partial class PickColorViewModel : INotifyPropertyChanged
    {
        private double hue;
        private double alpha = 1.0;

        private ColorPicker _colorPicker;

        public PickColorViewModel(ColorPicker colorPicker)
        {
            _colorPicker = colorPicker;
        }

        public double Hue
        {
            get => hue;
            set
            {
                hue = value;
                OnPropertyChanged(nameof(SelectedColor));
                OnPropertyChanged(nameof(ColorHex));
            }
        }

        public double Alpha
        {
            get => alpha;
            set
            {
                alpha = value;
                OnPropertyChanged(nameof(SelectedColor));
                OnPropertyChanged(nameof(ColorHex));
            }
        }

        public Color SelectedColor =>
            Color.FromHsva((float)(Hue / 360.0), 1f, 1f, (float)Alpha);

        public string ColorHex => SelectedColor.ToHex();

        public event PropertyChangedEventHandler PropertyChanged;
        private void OnPropertyChanged(string name) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        [RelayCommand]
        private void SaveSelectedColor()
        {
            _colorPicker.SelectedColor = ColorHex;
        }
    }
}
