namespace HarmonyBlend
{
	partial class Login
	{
		/// <summary>
		///  Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		///  Clean up any resources being used.
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
		///  Required method for Designer support - do not modify
		///  the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			test_button = new Button();
			textBox1 = new TextBox();
			maskedTextBox1 = new MaskedTextBox();
			pictureBox1 = new PictureBox();
			exit_button = new Button();
			label1 = new Label();
			label2 = new Label();
			button1 = new Button();
			((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
			SuspendLayout();
			// 
			// test_button
			// 
			test_button.Font = new Font("Segoe UI", 12.75F);
			test_button.Location = new Point(156, 232);
			test_button.Name = "test_button";
			test_button.Size = new Size(131, 39);
			test_button.TabIndex = 1;
			test_button.Text = "Giriş";
			test_button.UseVisualStyleBackColor = true;
			test_button.Click += Login_button_Click;
			// 
			// textBox1
			// 
			textBox1.Font = new Font("Segoe UI", 12F);
			textBox1.Location = new Point(95, 150);
			textBox1.Name = "textBox1";
			textBox1.Size = new Size(192, 29);
			textBox1.TabIndex = 2;
			// 
			// maskedTextBox1
			// 
			maskedTextBox1.Font = new Font("Segoe UI", 12F);
			maskedTextBox1.Location = new Point(95, 193);
			maskedTextBox1.Name = "maskedTextBox1";
			maskedTextBox1.Size = new Size(192, 29);
			maskedTextBox1.TabIndex = 3;
			// 
			// pictureBox1
			// 
			pictureBox1.Location = new Point(12, 12);
			pictureBox1.Name = "pictureBox1";
			pictureBox1.Size = new Size(274, 122);
			pictureBox1.TabIndex = 4;
			pictureBox1.TabStop = false;
			// 
			// exit_button
			// 
			exit_button.Font = new Font("Segoe UI", 12.75F);
			exit_button.Location = new Point(13, 232);
			exit_button.Name = "exit_button";
			exit_button.Size = new Size(128, 39);
			exit_button.TabIndex = 1;
			exit_button.Text = "Çıkış";
			exit_button.UseVisualStyleBackColor = true;
			exit_button.Click += Exit_button_Click;
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.Font = new Font("Segoe UI", 12F);
			label1.Location = new Point(13, 153);
			label1.Name = "label1";
			label1.Size = new Size(81, 21);
			label1.TabIndex = 5;
			label1.Text = "Username";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI", 12F);
			label2.Location = new Point(13, 196);
			label2.Name = "label2";
			label2.Size = new Size(76, 21);
			label2.TabIndex = 6;
			label2.Text = "Password";
			// 
			// button1
			// 
			button1.Location = new Point(14, 278);
			button1.Name = "button1";
			button1.Size = new Size(273, 23);
			button1.TabIndex = 7;
			button1.Text = "Kullanıcısız Giriş";
			button1.UseVisualStyleBackColor = true;
			button1.Click += button1_Click;
			// 
			// Login
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(299, 309);
			Controls.Add(button1);
			Controls.Add(label2);
			Controls.Add(label1);
			Controls.Add(pictureBox1);
			Controls.Add(maskedTextBox1);
			Controls.Add(textBox1);
			Controls.Add(exit_button);
			Controls.Add(test_button);
			MaximumSize = new Size(315, 348);
			MinimumSize = new Size(315, 348);
			Name = "Login";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "Form1";
			((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion
		private Button test_button;
		private TextBox textBox1;
		private MaskedTextBox maskedTextBox1;
		private PictureBox pictureBox1;
		private Button exit_button;
		private Label label1;
		private Label label2;
		private Button button1;
	}
}
