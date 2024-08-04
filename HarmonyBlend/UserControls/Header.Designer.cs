namespace HarmonyBlend.UserControls
{
	partial class Header
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
			panel_Control = new Panel();
			button1 = new Button();
			panel8 = new Panel();
			minimize_button = new Button();
			maximaze_button = new Button();
			exit_button = new Button();
			header_label = new Label();
			panel_Control.SuspendLayout();
			panel8.SuspendLayout();
			SuspendLayout();
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.DimGray;
			panel_Control.Controls.Add(button1);
			panel_Control.Controls.Add(panel8);
			panel_Control.Controls.Add(header_label);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(796, 30);
			panel_Control.TabIndex = 6;
			panel_Control.MouseDown += HeaderMouseDown_Event;
			// 
			// button1
			// 
			button1.FlatStyle = FlatStyle.Flat;
			button1.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold);
			button1.Location = new Point(571, 3);
			button1.Name = "button1";
			button1.Size = new Size(127, 23);
			button1.TabIndex = 1;
			button1.Text = "BaseForm Control!";
			button1.UseVisualStyleBackColor = true;
			button1.Click += button1_Click;
			// 
			// panel8
			// 
			panel8.Controls.Add(minimize_button);
			panel8.Controls.Add(maximaze_button);
			panel8.Controls.Add(exit_button);
			panel8.Dock = DockStyle.Right;
			panel8.Location = new Point(705, 0);
			panel8.Name = "panel8";
			panel8.Size = new Size(91, 30);
			panel8.TabIndex = 0;
			// 
			// minimize_button
			// 
			minimize_button.BackColor = Color.DimGray;
			minimize_button.FlatAppearance.BorderSize = 0;
			minimize_button.FlatStyle = FlatStyle.Flat;
			minimize_button.Font = new Font("Microsoft Sans Serif", 10F);
			minimize_button.ForeColor = SystemColors.WindowText;
			minimize_button.Image = Properties.Resources.subminimize_16x16_White;
			minimize_button.Location = new Point(1, 1);
			minimize_button.Name = "minimize_button";
			minimize_button.Size = new Size(30, 30);
			minimize_button.TabIndex = 7;
			minimize_button.UseVisualStyleBackColor = false;
			minimize_button.Click += minimize_button_Click;
			// 
			// maximaze_button
			// 
			maximaze_button.BackColor = Color.DimGray;
			maximaze_button.FlatAppearance.BorderSize = 0;
			maximaze_button.FlatStyle = FlatStyle.Flat;
			maximaze_button.Font = new Font("Microsoft Sans Serif", 10F);
			maximaze_button.ForeColor = SystemColors.WindowText;
			maximaze_button.Image = Properties.Resources.minimize_16x16_White;
			maximaze_button.Location = new Point(31, 1);
			maximaze_button.Name = "maximaze_button";
			maximaze_button.Size = new Size(30, 30);
			maximaze_button.TabIndex = 6;
			maximaze_button.UseVisualStyleBackColor = false;
			maximaze_button.Click += maximaze_button_Click;
			// 
			// exit_button
			// 
			exit_button.BackColor = Color.DimGray;
			exit_button.FlatAppearance.BorderSize = 0;
			exit_button.FlatStyle = FlatStyle.Flat;
			exit_button.Font = new Font("Microsoft Sans Serif", 10F);
			exit_button.ForeColor = SystemColors.WindowText;
			exit_button.Image = Properties.Resources.close_16x16_White;
			exit_button.Location = new Point(61, 1);
			exit_button.Name = "exit_button";
			exit_button.Size = new Size(30, 30);
			exit_button.TabIndex = 5;
			exit_button.UseVisualStyleBackColor = false;
			exit_button.Click += exit_button_Click;
			// 
			// header_label
			// 
			header_label.AutoSize = true;
			header_label.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			header_label.ForeColor = Color.White;
			header_label.Location = new Point(12, 5);
			header_label.Name = "header_label";
			header_label.Size = new Size(31, 22);
			header_label.TabIndex = 0;
			header_label.Text = "Text";
			header_label.UseCompatibleTextRendering = true;
			// 
			// Header
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			Controls.Add(panel_Control);
			Name = "Header";
			Size = new Size(796, 30);
			Paint += Header_Paint;
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			panel8.ResumeLayout(false);
			ResumeLayout(false);
		}

		#endregion

		private Panel panel_Control;
		private Panel panel8;
		private Button minimize_button;
		private Button maximaze_button;
		private Button exit_button;
		private Label header_label;
		private Button button1;
	}
}
