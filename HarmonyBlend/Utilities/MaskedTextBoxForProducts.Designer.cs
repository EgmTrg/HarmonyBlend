namespace HarmonyBlend.Utilities
{
	partial class MaskedTextBoxForProducts
	{
		/// <summary> 
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary> 
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Component Designer generated code

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			ForProduct_maskedTextBox = new MaskedTextBox();
			SuspendLayout();
			// 
			// ForProduct_maskedTextBox
			// 
			ForProduct_maskedTextBox.Location = new Point(0, 0);
			ForProduct_maskedTextBox.Mask = "000.00.000";
			ForProduct_maskedTextBox.Name = "ForProduct_maskedTextBox";
			ForProduct_maskedTextBox.Size = new Size(200, 23);
			ForProduct_maskedTextBox.TabIndex = 0;
			// 
			// MaskedTextBoxForProducts
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			Controls.Add(ForProduct_maskedTextBox);
			Name = "MaskedTextBoxForProducts";
			Size = new Size(200, 23);
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion

		private MaskedTextBox ForProduct_maskedTextBox;
	}
}
