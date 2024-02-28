namespace HarmonyBlend
{
	partial class AppForm
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

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			components = new System.ComponentModel.Container();
			panel_Control = new Panel();
			label1 = new Label();
			sidebar_buttonPictureBox = new PictureBox();
			button4 = new Button();
			sidebar_flowLayoutPanel = new FlowLayoutPanel();
			pictureBox2 = new PictureBox();
			panel5 = new Panel();
			button6 = new Button();
			menuButton_flowLayoutPanel = new FlowLayoutPanel();
			panel1 = new Panel();
			menu_button = new Button();
			panel6 = new Panel();
			menu_subbutton1 = new Button();
			panel7 = new Panel();
			menu_subbutton2 = new Button();
			panel2 = new Panel();
			settings_button = new Button();
			panel3 = new Panel();
			about_button = new Button();
			panel4 = new Panel();
			logout_button = new Button();
			mainPanel = new Panel();
			menuButtonTransition = new System.Windows.Forms.Timer(components);
			button1 = new Button();
			button2 = new Button();
			panel_Control.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)sidebar_buttonPictureBox).BeginInit();
			sidebar_flowLayoutPanel.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
			panel5.SuspendLayout();
			menuButton_flowLayoutPanel.SuspendLayout();
			panel1.SuspendLayout();
			panel6.SuspendLayout();
			panel7.SuspendLayout();
			panel2.SuspendLayout();
			panel3.SuspendLayout();
			panel4.SuspendLayout();
			SuspendLayout();
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.White;
			panel_Control.Controls.Add(button2);
			panel_Control.Controls.Add(button1);
			panel_Control.Controls.Add(label1);
			panel_Control.Controls.Add(sidebar_buttonPictureBox);
			panel_Control.Controls.Add(button4);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(1004, 38);
			panel_Control.TabIndex = 1;
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			label1.ForeColor = Color.Black;
			label1.Location = new Point(56, 7);
			label1.Name = "label1";
			label1.Size = new Size(163, 17);
			label1.TabIndex = 0;
			label1.Text = "EGMTRG | HarmonyBlend";
			// 
			// sidebar_buttonPictureBox
			// 
			sidebar_buttonPictureBox.Image = Properties.Resources.menu_512x512;
			sidebar_buttonPictureBox.Location = new Point(6, 3);
			sidebar_buttonPictureBox.Name = "sidebar_buttonPictureBox";
			sidebar_buttonPictureBox.Size = new Size(38, 26);
			sidebar_buttonPictureBox.SizeMode = PictureBoxSizeMode.Zoom;
			sidebar_buttonPictureBox.TabIndex = 0;
			sidebar_buttonPictureBox.TabStop = false;
			// 
			// button4
			// 
			button4.BackColor = Color.White;
			button4.FlatAppearance.BorderSize = 0;
			button4.FlatStyle = FlatStyle.Flat;
			button4.Font = new Font("Microsoft Sans Serif", 10F);
			button4.ForeColor = SystemColors.WindowText;
			button4.Image = Properties.Resources.close_16x16;
			button4.Location = new Point(969, 3);
			button4.Name = "button4";
			button4.Size = new Size(32, 32);
			button4.TabIndex = 2;
			button4.UseVisualStyleBackColor = false;
			// 
			// sidebar_flowLayoutPanel
			// 
			sidebar_flowLayoutPanel.BackColor = SystemColors.WindowText;
			sidebar_flowLayoutPanel.Controls.Add(pictureBox2);
			sidebar_flowLayoutPanel.Controls.Add(panel5);
			sidebar_flowLayoutPanel.Controls.Add(menuButton_flowLayoutPanel);
			sidebar_flowLayoutPanel.Controls.Add(panel2);
			sidebar_flowLayoutPanel.Controls.Add(panel3);
			sidebar_flowLayoutPanel.Controls.Add(panel4);
			sidebar_flowLayoutPanel.Dock = DockStyle.Left;
			sidebar_flowLayoutPanel.Location = new Point(0, 38);
			sidebar_flowLayoutPanel.Name = "sidebar_flowLayoutPanel";
			sidebar_flowLayoutPanel.Size = new Size(177, 546);
			sidebar_flowLayoutPanel.TabIndex = 5;
			// 
			// pictureBox2
			// 
			pictureBox2.Location = new Point(0, 0);
			pictureBox2.Margin = new Padding(0);
			pictureBox2.Name = "pictureBox2";
			pictureBox2.Size = new Size(176, 76);
			pictureBox2.TabIndex = 0;
			pictureBox2.TabStop = false;
			// 
			// panel5
			// 
			panel5.Controls.Add(button6);
			panel5.Location = new Point(0, 76);
			panel5.Margin = new Padding(0);
			panel5.Name = "panel5";
			panel5.Size = new Size(178, 52);
			panel5.TabIndex = 1;
			// 
			// button6
			// 
			button6.BackColor = SystemColors.WindowText;
			button6.FlatAppearance.BorderSize = 0;
			button6.FlatStyle = FlatStyle.Flat;
			button6.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			button6.ForeColor = Color.White;
			button6.Image = Properties.Resources.dashboard_32x32_White;
			button6.ImageAlign = ContentAlignment.MiddleLeft;
			button6.Location = new Point(-1, 0);
			button6.Name = "button6";
			button6.Padding = new Padding(10, 0, 0, 0);
			button6.Size = new Size(176, 50);
			button6.TabIndex = 0;
			button6.Text = "Dashboard";
			button6.UseVisualStyleBackColor = false;
			// 
			// menuButton_flowLayoutPanel
			// 
			menuButton_flowLayoutPanel.BackColor = Color.FromArgb(32, 33, 36);
			menuButton_flowLayoutPanel.Controls.Add(panel1);
			menuButton_flowLayoutPanel.Controls.Add(panel6);
			menuButton_flowLayoutPanel.Controls.Add(panel7);
			menuButton_flowLayoutPanel.Location = new Point(3, 131);
			menuButton_flowLayoutPanel.Name = "menuButton_flowLayoutPanel";
			menuButton_flowLayoutPanel.Size = new Size(177, 51);
			menuButton_flowLayoutPanel.TabIndex = 3;
			// 
			// panel1
			// 
			panel1.Controls.Add(menu_button);
			panel1.Location = new Point(0, 0);
			panel1.Margin = new Padding(0);
			panel1.Name = "panel1";
			panel1.Size = new Size(178, 52);
			panel1.TabIndex = 1;
			// 
			// menu_button
			// 
			menu_button.BackColor = SystemColors.WindowText;
			menu_button.FlatAppearance.BorderSize = 0;
			menu_button.FlatStyle = FlatStyle.Flat;
			menu_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_button.ForeColor = Color.White;
			menu_button.Image = Properties.Resources.home_32x32_White;
			menu_button.ImageAlign = ContentAlignment.MiddleLeft;
			menu_button.Location = new Point(-1, 0);
			menu_button.Margin = new Padding(0);
			menu_button.Name = "menu_button";
			menu_button.Padding = new Padding(10, 0, 0, 0);
			menu_button.Size = new Size(176, 50);
			menu_button.TabIndex = 0;
			menu_button.Text = "Menu";
			menu_button.UseVisualStyleBackColor = false;
			menu_button.Click += menu_button_Click;
			// 
			// panel6
			// 
			panel6.Controls.Add(menu_subbutton1);
			panel6.Location = new Point(0, 52);
			panel6.Margin = new Padding(0);
			panel6.Name = "panel6";
			panel6.Size = new Size(178, 52);
			panel6.TabIndex = 1;
			// 
			// menu_subbutton1
			// 
			menu_subbutton1.BackColor = Color.FromArgb(32, 33, 36);
			menu_subbutton1.FlatAppearance.BorderSize = 0;
			menu_subbutton1.FlatStyle = FlatStyle.Flat;
			menu_subbutton1.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_subbutton1.ForeColor = Color.White;
			menu_subbutton1.Image = Properties.Resources.button_16x16_White;
			menu_subbutton1.ImageAlign = ContentAlignment.MiddleLeft;
			menu_subbutton1.Location = new Point(-1, 0);
			menu_subbutton1.Margin = new Padding(0);
			menu_subbutton1.Name = "menu_subbutton1";
			menu_subbutton1.Padding = new Padding(25, 0, 0, 0);
			menu_subbutton1.Size = new Size(176, 50);
			menu_subbutton1.TabIndex = 0;
			menu_subbutton1.Text = "Sub Menu 1";
			menu_subbutton1.UseVisualStyleBackColor = false;
			// 
			// panel7
			// 
			panel7.Controls.Add(menu_subbutton2);
			panel7.Location = new Point(0, 104);
			panel7.Margin = new Padding(0);
			panel7.Name = "panel7";
			panel7.Size = new Size(178, 52);
			panel7.TabIndex = 2;
			// 
			// menu_subbutton2
			// 
			menu_subbutton2.BackColor = Color.FromArgb(32, 33, 36);
			menu_subbutton2.FlatAppearance.BorderSize = 0;
			menu_subbutton2.FlatStyle = FlatStyle.Flat;
			menu_subbutton2.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_subbutton2.ForeColor = Color.White;
			menu_subbutton2.Image = Properties.Resources.button_16x16_White;
			menu_subbutton2.ImageAlign = ContentAlignment.MiddleLeft;
			menu_subbutton2.Location = new Point(-1, 0);
			menu_subbutton2.Margin = new Padding(0);
			menu_subbutton2.Name = "menu_subbutton2";
			menu_subbutton2.Padding = new Padding(25, 0, 0, 0);
			menu_subbutton2.Size = new Size(176, 50);
			menu_subbutton2.TabIndex = 0;
			menu_subbutton2.Text = "Sub Menu 2";
			menu_subbutton2.UseVisualStyleBackColor = false;
			// 
			// panel2
			// 
			panel2.Controls.Add(settings_button);
			panel2.Location = new Point(0, 185);
			panel2.Margin = new Padding(0);
			panel2.Name = "panel2";
			panel2.Size = new Size(178, 52);
			panel2.TabIndex = 2;
			// 
			// settings_button
			// 
			settings_button.BackColor = SystemColors.WindowText;
			settings_button.FlatAppearance.BorderSize = 0;
			settings_button.FlatStyle = FlatStyle.Flat;
			settings_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			settings_button.ForeColor = Color.White;
			settings_button.Image = Properties.Resources.settings_32x32_White;
			settings_button.ImageAlign = ContentAlignment.MiddleLeft;
			settings_button.Location = new Point(-1, 0);
			settings_button.Name = "settings_button";
			settings_button.Padding = new Padding(10, 0, 0, 0);
			settings_button.Size = new Size(176, 50);
			settings_button.TabIndex = 0;
			settings_button.Text = "Settings";
			settings_button.UseVisualStyleBackColor = false;
			// 
			// panel3
			// 
			panel3.Controls.Add(about_button);
			panel3.Location = new Point(0, 237);
			panel3.Margin = new Padding(0);
			panel3.Name = "panel3";
			panel3.Size = new Size(178, 52);
			panel3.TabIndex = 2;
			// 
			// about_button
			// 
			about_button.BackColor = SystemColors.WindowText;
			about_button.FlatAppearance.BorderSize = 0;
			about_button.FlatStyle = FlatStyle.Flat;
			about_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			about_button.ForeColor = Color.White;
			about_button.Image = Properties.Resources.information_32x32_White;
			about_button.ImageAlign = ContentAlignment.MiddleLeft;
			about_button.Location = new Point(-1, 0);
			about_button.Name = "about_button";
			about_button.Padding = new Padding(10, 0, 0, 0);
			about_button.Size = new Size(176, 50);
			about_button.TabIndex = 0;
			about_button.Text = "About";
			about_button.UseVisualStyleBackColor = false;
			// 
			// panel4
			// 
			panel4.Controls.Add(logout_button);
			panel4.Location = new Point(0, 289);
			panel4.Margin = new Padding(0);
			panel4.Name = "panel4";
			panel4.Size = new Size(178, 52);
			panel4.TabIndex = 2;
			// 
			// logout_button
			// 
			logout_button.BackColor = SystemColors.WindowText;
			logout_button.FlatAppearance.BorderSize = 0;
			logout_button.FlatStyle = FlatStyle.Flat;
			logout_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			logout_button.ForeColor = Color.White;
			logout_button.Image = Properties.Resources.logout_32x32_White;
			logout_button.ImageAlign = ContentAlignment.MiddleLeft;
			logout_button.Location = new Point(-1, 0);
			logout_button.Name = "logout_button";
			logout_button.Padding = new Padding(10, 0, 0, 0);
			logout_button.Size = new Size(176, 50);
			logout_button.TabIndex = 0;
			logout_button.Text = "Logout";
			logout_button.UseVisualStyleBackColor = false;
			// 
			// mainPanel
			// 
			mainPanel.Dock = DockStyle.Fill;
			mainPanel.Location = new Point(177, 38);
			mainPanel.Name = "mainPanel";
			mainPanel.Size = new Size(827, 546);
			mainPanel.TabIndex = 6;
			// 
			// menuButtonTransition
			// 
			menuButtonTransition.Tick += menuTransition_Tick;
			// 
			// button1
			// 
			button1.BackColor = Color.White;
			button1.FlatAppearance.BorderSize = 0;
			button1.FlatStyle = FlatStyle.Flat;
			button1.Font = new Font("Microsoft Sans Serif", 10F);
			button1.ForeColor = SystemColors.WindowText;
			button1.Image = Properties.Resources.minimize_16x16;
			button1.Location = new Point(931, 3);
			button1.Name = "button1";
			button1.Size = new Size(32, 32);
			button1.TabIndex = 3;
			button1.UseVisualStyleBackColor = false;
			// 
			// button2
			// 
			button2.BackColor = Color.White;
			button2.FlatAppearance.BorderSize = 0;
			button2.FlatStyle = FlatStyle.Flat;
			button2.Font = new Font("Microsoft Sans Serif", 10F);
			button2.ForeColor = SystemColors.WindowText;
			button2.Location = new Point(893, 3);
			button2.Name = "button2";
			button2.Size = new Size(32, 32);
			button2.TabIndex = 4;
			button2.UseVisualStyleBackColor = false;
			// 
			// AppForm
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(1004, 584);
			Controls.Add(mainPanel);
			Controls.Add(sidebar_flowLayoutPanel);
			Controls.Add(panel_Control);
			ForeColor = Color.Black;
			FormBorderStyle = FormBorderStyle.None;
			Name = "AppForm";
			Text = "AppForm";
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			((System.ComponentModel.ISupportInitialize)sidebar_buttonPictureBox).EndInit();
			sidebar_flowLayoutPanel.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
			panel5.ResumeLayout(false);
			menuButton_flowLayoutPanel.ResumeLayout(false);
			panel1.ResumeLayout(false);
			panel6.ResumeLayout(false);
			panel7.ResumeLayout(false);
			panel2.ResumeLayout(false);
			panel3.ResumeLayout(false);
			panel4.ResumeLayout(false);
			ResumeLayout(false);
		}

		#endregion

		private Panel panel_Control;
		private Button button4;
		private FlowLayoutPanel sidebar_flowLayoutPanel;
		private Panel mainPanel;
		private Label label1;
		private PictureBox sidebar_buttonPictureBox;
		private Panel panel1;
		private Button menu_button;
		private Panel panel4;
		private Button logout_button;
		private Panel panel3;
		private Button about_button;
		private Panel panel2;
		private Button settings_button;
		private Panel panel5;
		private Button button6;
		private FlowLayoutPanel menuButton_flowLayoutPanel;
		private Panel panel6;
		private Button menu_subbutton1;
		private Panel panel7;
		private Button menu_subbutton2;
		private System.Windows.Forms.Timer menuButtonTransition;
		private PictureBox pictureBox2;
		private Button button2;
		private Button button1;
	}
}