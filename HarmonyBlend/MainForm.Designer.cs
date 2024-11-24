namespace HarmonyBlend
{
	partial class MainForm
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
			sideBar_button = new Button();
			panel8 = new Panel();
			information_button = new Button();
			minimize_button = new Button();
			maximaze_button = new Button();
			exit_button = new Button();
			loggedInUsername_label = new Label();
			sidebar_flowLayoutPanel = new FlowLayoutPanel();
			pictureBox2 = new PictureBox();
			dashboard_button = new Button();
			menuButton_flowLayoutPanel = new FlowLayoutPanel();
			menu_button = new Button();
			menu_sub1_Order_button = new Button();
			menu_sub2_button = new Button();
			about_button = new Button();
			settings_button = new Button();
			logout_button = new Button();
			menuButtonTransition = new System.Windows.Forms.Timer(components);
			sidebarTransition = new System.Windows.Forms.Timer(components);
			panel_Control.SuspendLayout();
			panel8.SuspendLayout();
			sidebar_flowLayoutPanel.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
			menuButton_flowLayoutPanel.SuspendLayout();
			SuspendLayout();
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.FromArgb(40, 47, 58);
			panel_Control.Controls.Add(sideBar_button);
			panel_Control.Controls.Add(panel8);
			panel_Control.Controls.Add(loggedInUsername_label);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(1403, 30);
			panel_Control.TabIndex = 1;
			panel_Control.MouseDown += HeaderMouseDown_Event;
			// 
			// sideBar_button
			// 
			sideBar_button.FlatAppearance.BorderSize = 0;
			sideBar_button.FlatStyle = FlatStyle.Flat;
			sideBar_button.Image = Properties.Resources.menu_32x32_White;
			sideBar_button.Location = new Point(3, -1);
			sideBar_button.Name = "sideBar_button";
			sideBar_button.Size = new Size(47, 32);
			sideBar_button.TabIndex = 0;
			sideBar_button.UseVisualStyleBackColor = true;
			sideBar_button.Click += sideBar_button_Click;
			// 
			// panel8
			// 
			panel8.Controls.Add(information_button);
			panel8.Controls.Add(minimize_button);
			panel8.Controls.Add(maximaze_button);
			panel8.Controls.Add(exit_button);
			panel8.Dock = DockStyle.Right;
			panel8.Location = new Point(1278, 0);
			panel8.Name = "panel8";
			panel8.Size = new Size(125, 30);
			panel8.TabIndex = 0;
			// 
			// information_button
			// 
			information_button.BackColor = Color.FromArgb(40, 47, 58);
			information_button.FlatAppearance.BorderSize = 0;
			information_button.FlatStyle = FlatStyle.Flat;
			information_button.Font = new Font("Microsoft Sans Serif", 10F);
			information_button.ForeColor = SystemColors.Window;
			information_button.Location = new Point(2, 0);
			information_button.Name = "information_button";
			information_button.Size = new Size(30, 30);
			information_button.TabIndex = 8;
			information_button.Text = "?";
			information_button.UseVisualStyleBackColor = false;
			information_button.Click += information_button_Click;
			// 
			// minimize_button
			// 
			minimize_button.BackColor = Color.FromArgb(40, 47, 58);
			minimize_button.FlatAppearance.BorderSize = 0;
			minimize_button.FlatStyle = FlatStyle.Flat;
			minimize_button.Font = new Font("Microsoft Sans Serif", 10F);
			minimize_button.ForeColor = SystemColors.WindowText;
			minimize_button.Image = Properties.Resources.subminimize_16x16_White;
			minimize_button.Location = new Point(32, 1);
			minimize_button.Name = "minimize_button";
			minimize_button.Size = new Size(30, 30);
			minimize_button.TabIndex = 7;
			minimize_button.UseVisualStyleBackColor = false;
			minimize_button.Click += minimize_button_Click;
			// 
			// maximaze_button
			// 
			maximaze_button.BackColor = Color.FromArgb(40, 47, 58);
			maximaze_button.FlatAppearance.BorderSize = 0;
			maximaze_button.FlatStyle = FlatStyle.Flat;
			maximaze_button.Font = new Font("Microsoft Sans Serif", 10F);
			maximaze_button.ForeColor = SystemColors.WindowText;
			maximaze_button.Image = Properties.Resources.minimize_16x16_White;
			maximaze_button.Location = new Point(62, 1);
			maximaze_button.Name = "maximaze_button";
			maximaze_button.Size = new Size(30, 30);
			maximaze_button.TabIndex = 6;
			maximaze_button.UseVisualStyleBackColor = false;
			maximaze_button.Click += maximaze_button_Click;
			// 
			// exit_button
			// 
			exit_button.BackColor = Color.FromArgb(40, 47, 58);
			exit_button.FlatAppearance.BorderSize = 0;
			exit_button.FlatStyle = FlatStyle.Flat;
			exit_button.Font = new Font("Microsoft Sans Serif", 10F);
			exit_button.ForeColor = SystemColors.WindowText;
			exit_button.Image = Properties.Resources.close_16x16_White;
			exit_button.Location = new Point(92, 1);
			exit_button.Name = "exit_button";
			exit_button.Size = new Size(30, 30);
			exit_button.TabIndex = 5;
			exit_button.UseVisualStyleBackColor = false;
			exit_button.Click += exit_button_Click;
			// 
			// loggedInUsername_label
			// 
			loggedInUsername_label.AutoSize = true;
			loggedInUsername_label.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			loggedInUsername_label.ForeColor = Color.White;
			loggedInUsername_label.Location = new Point(56, 7);
			loggedInUsername_label.Name = "loggedInUsername_label";
			loggedInUsername_label.Size = new Size(103, 22);
			loggedInUsername_label.TabIndex = 0;
			loggedInUsername_label.Text = "| HarmonyBlend";
			loggedInUsername_label.UseCompatibleTextRendering = true;
			loggedInUsername_label.MouseDown += HeaderMouseDown_Event;
			// 
			// sidebar_flowLayoutPanel
			// 
			sidebar_flowLayoutPanel.BackColor = Color.FromArgb(40, 47, 58);
			sidebar_flowLayoutPanel.Controls.Add(pictureBox2);
			sidebar_flowLayoutPanel.Controls.Add(dashboard_button);
			sidebar_flowLayoutPanel.Controls.Add(about_button);
			sidebar_flowLayoutPanel.Controls.Add(settings_button);
			sidebar_flowLayoutPanel.Controls.Add(logout_button);
			sidebar_flowLayoutPanel.Controls.Add(menuButton_flowLayoutPanel);
			sidebar_flowLayoutPanel.Dock = DockStyle.Left;
			sidebar_flowLayoutPanel.Location = new Point(0, 30);
			sidebar_flowLayoutPanel.Name = "sidebar_flowLayoutPanel";
			sidebar_flowLayoutPanel.Size = new Size(177, 820);
			sidebar_flowLayoutPanel.TabIndex = 5;
			// 
			// pictureBox2
			// 
			pictureBox2.BackColor = Color.FromArgb(40, 47, 58);
			pictureBox2.ErrorImage = Properties.Resources._c8ee5be0_988a_4ba2_a2be_b7f600344b3a_removebg_preview;
			pictureBox2.Image = Properties.Resources._c8ee5be0_988a_4ba2_a2be_b7f600344b3a_removebg_preview;
			pictureBox2.ImageLocation = "";
			pictureBox2.Location = new Point(18, 5);
			pictureBox2.Margin = new Padding(18, 5, 0, 0);
			pictureBox2.Name = "pictureBox2";
			pictureBox2.Size = new Size(85, 80);
			pictureBox2.SizeMode = PictureBoxSizeMode.Zoom;
			pictureBox2.TabIndex = 0;
			pictureBox2.TabStop = false;
			// 
			// dashboard_button
			// 
			dashboard_button.BackColor = Color.FromArgb(40, 47, 58);
			dashboard_button.FlatAppearance.BorderSize = 0;
			dashboard_button.FlatStyle = FlatStyle.Flat;
			dashboard_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dashboard_button.ForeColor = Color.White;
			dashboard_button.Image = Properties.Resources.dashboard_32x32_White;
			dashboard_button.ImageAlign = ContentAlignment.MiddleLeft;
			dashboard_button.Location = new Point(3, 88);
			dashboard_button.Name = "dashboard_button";
			dashboard_button.Padding = new Padding(10, 0, 0, 0);
			dashboard_button.Size = new Size(176, 50);
			dashboard_button.TabIndex = 0;
			dashboard_button.Text = "Dashboard";
			dashboard_button.UseVisualStyleBackColor = false;
			dashboard_button.Click += OpenPage_button_Click;
			// 
			// menuButton_flowLayoutPanel
			// 
			menuButton_flowLayoutPanel.BackColor = Color.FromArgb(40, 47, 58);
			menuButton_flowLayoutPanel.Controls.Add(menu_button);
			menuButton_flowLayoutPanel.Controls.Add(menu_sub1_Order_button);
			menuButton_flowLayoutPanel.Controls.Add(menu_sub2_button);
			menuButton_flowLayoutPanel.Location = new Point(3, 312);
			menuButton_flowLayoutPanel.Name = "menuButton_flowLayoutPanel";
			menuButton_flowLayoutPanel.Size = new Size(177, 177);
			menuButton_flowLayoutPanel.TabIndex = 3;
			// 
			// menu_button
			// 
			menu_button.BackColor = Color.FromArgb(40, 47, 58);
			menu_button.FlatAppearance.BorderSize = 0;
			menu_button.FlatStyle = FlatStyle.Flat;
			menu_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_button.ForeColor = Color.White;
			menu_button.Image = Properties.Resources.home_32x32_White;
			menu_button.ImageAlign = ContentAlignment.MiddleLeft;
			menu_button.Location = new Point(0, 0);
			menu_button.Margin = new Padding(0);
			menu_button.Name = "menu_button";
			menu_button.Padding = new Padding(10, 0, 0, 0);
			menu_button.Size = new Size(176, 50);
			menu_button.TabIndex = 0;
			menu_button.Text = "Menu";
			menu_button.UseVisualStyleBackColor = false;
			menu_button.Click += menu_button_Click;
			// 
			// menu_sub1_Order_button
			// 
			menu_sub1_Order_button.BackColor = Color.FromArgb(40, 47, 58);
			menu_sub1_Order_button.FlatAppearance.BorderSize = 0;
			menu_sub1_Order_button.FlatStyle = FlatStyle.Flat;
			menu_sub1_Order_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_sub1_Order_button.ForeColor = Color.White;
			menu_sub1_Order_button.Image = Properties.Resources.button_16x16_White;
			menu_sub1_Order_button.ImageAlign = ContentAlignment.MiddleLeft;
			menu_sub1_Order_button.Location = new Point(0, 50);
			menu_sub1_Order_button.Margin = new Padding(0);
			menu_sub1_Order_button.Name = "menu_sub1_Order_button";
			menu_sub1_Order_button.Padding = new Padding(25, 0, 0, 0);
			menu_sub1_Order_button.Size = new Size(176, 50);
			menu_sub1_Order_button.TabIndex = 0;
			menu_sub1_Order_button.Text = "Sipariş Ver";
			menu_sub1_Order_button.UseVisualStyleBackColor = false;
			menu_sub1_Order_button.Click += OpenPage_button_Click;
			// 
			// menu_sub2_button
			// 
			menu_sub2_button.BackColor = Color.FromArgb(40, 47, 58);
			menu_sub2_button.FlatAppearance.BorderSize = 0;
			menu_sub2_button.FlatStyle = FlatStyle.Flat;
			menu_sub2_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			menu_sub2_button.ForeColor = Color.White;
			menu_sub2_button.Image = Properties.Resources.button_16x16_White;
			menu_sub2_button.ImageAlign = ContentAlignment.MiddleLeft;
			menu_sub2_button.Location = new Point(0, 100);
			menu_sub2_button.Margin = new Padding(0);
			menu_sub2_button.Name = "menu_sub2_button";
			menu_sub2_button.Padding = new Padding(25, 0, 0, 0);
			menu_sub2_button.Size = new Size(176, 50);
			menu_sub2_button.TabIndex = 0;
			menu_sub2_button.Text = "Siparişlerim";
			menu_sub2_button.UseVisualStyleBackColor = false;
			menu_sub2_button.Click += OpenPage_button_Click;
			// 
			// about_button
			// 
			about_button.BackColor = Color.FromArgb(40, 47, 58);
			about_button.FlatAppearance.BorderSize = 0;
			about_button.FlatStyle = FlatStyle.Flat;
			about_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			about_button.ForeColor = Color.White;
			about_button.Image = Properties.Resources.information_32x32_White;
			about_button.ImageAlign = ContentAlignment.MiddleLeft;
			about_button.Location = new Point(3, 144);
			about_button.Name = "about_button";
			about_button.Padding = new Padding(10, 0, 0, 0);
			about_button.Size = new Size(176, 50);
			about_button.TabIndex = 0;
			about_button.Text = "About";
			about_button.UseVisualStyleBackColor = false;
			about_button.Click += OpenPage_button_Click;
			// 
			// settings_button
			// 
			settings_button.BackColor = Color.FromArgb(40, 47, 58);
			settings_button.FlatAppearance.BorderSize = 0;
			settings_button.FlatStyle = FlatStyle.Flat;
			settings_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			settings_button.ForeColor = Color.White;
			settings_button.Image = Properties.Resources.settings_32x32_White;
			settings_button.ImageAlign = ContentAlignment.MiddleLeft;
			settings_button.Location = new Point(3, 200);
			settings_button.Name = "settings_button";
			settings_button.Padding = new Padding(10, 0, 0, 0);
			settings_button.Size = new Size(176, 50);
			settings_button.TabIndex = 0;
			settings_button.Text = "Settings";
			settings_button.UseVisualStyleBackColor = false;
			settings_button.Click += OpenPage_button_Click;
			// 
			// logout_button
			// 
			logout_button.BackColor = Color.FromArgb(40, 47, 58);
			logout_button.FlatAppearance.BorderSize = 0;
			logout_button.FlatStyle = FlatStyle.Flat;
			logout_button.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			logout_button.ForeColor = Color.White;
			logout_button.Image = Properties.Resources.logout_32x32_White;
			logout_button.ImageAlign = ContentAlignment.MiddleLeft;
			logout_button.Location = new Point(3, 256);
			logout_button.Name = "logout_button";
			logout_button.Padding = new Padding(10, 0, 0, 0);
			logout_button.Size = new Size(176, 50);
			logout_button.TabIndex = 0;
			logout_button.Text = "Logout";
			logout_button.UseVisualStyleBackColor = false;
			logout_button.Click += OpenPage_button_Click;
			// 
			// menuButtonTransition
			// 
			menuButtonTransition.Interval = 20;
			menuButtonTransition.Tick += menuTransition_Tick;
			// 
			// sidebarTransition
			// 
			sidebarTransition.Interval = 20;
			sidebarTransition.Tick += sidebarTransition_Tick;
			// 
			// MainForm
			// 
			AutoScaleMode = AutoScaleMode.None;
			ClientSize = new Size(1403, 850);
			Controls.Add(sidebar_flowLayoutPanel);
			Controls.Add(panel_Control);
			ForeColor = Color.Black;
			FormBorderStyle = FormBorderStyle.None;
			IsMdiContainer = true;
			MinimumSize = new Size(780, 400);
			Name = "MainForm";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "AppForm";
			WindowState = FormWindowState.Maximized;
			FormClosed += MainForm_FormClosed;
			Load += MainForm_Load;
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			panel8.ResumeLayout(false);
			sidebar_flowLayoutPanel.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
			menuButton_flowLayoutPanel.ResumeLayout(false);
			ResumeLayout(false);
		}

		#endregion

		private Panel panel_Control;
		private FlowLayoutPanel sidebar_flowLayoutPanel;
		private Label loggedInUsername_label;
		private Button menu_button;
		private Button logout_button;
		private Button about_button;
		private Button settings_button;
		private Button dashboard_button;
		private FlowLayoutPanel menuButton_flowLayoutPanel;
		private Button menu_sub1_Order_button;
		private Button menu_sub2_button;
		private System.Windows.Forms.Timer menuButtonTransition;
		private PictureBox pictureBox2;
		private Panel panel8;
		private Button minimize_button;
		private Button maximaze_button;
		private Button exit_button;
		private System.Windows.Forms.Timer sidebarTransition;
		private Button sideBar_button;
		private Button information_button;
	}
}