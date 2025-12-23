using CommunityToolkit.Maui.Views;
using Foodfolio.MAUI.MVVM.ViewModels;

namespace Foodfolio.MVVM.Views;

public partial class PickColorPage : Popup
{
	
	public PickColorPage(PickColorViewModel _pcvm)
	{
		InitializeComponent();
		ColorPickerPopup.BindingContext = _pcvm;
	}
}